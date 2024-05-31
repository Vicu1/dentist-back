import { BadRequestException, Injectable } from '@nestjs/common';
import { AppointmentRepository } from '@/app/modules/appointment/appointment.repository';
import { AppointmentCreateDto } from '@/app/modules/appointment/dto/appointment-create.dto';
import { ClientAdminService } from '@/app/modules/client/admin/client.admin.service';
import { StatusesEnum } from '@/app/modules/appointment/types/statuses.enum';
import { WorkingPlanAdminService } from '@/app/modules/working-plan/admin/working-plan.admin.service';
import { ProcedureAdminService } from '@/app/modules/procedure/admin/procedure.admin.service';
import * as dayjs from 'dayjs';
import * as isBetween from 'dayjs/plugin/isBetween';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(isBetween);
dayjs.extend(customParseFormat);
@Injectable()
export class AppointmentService {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly clientAdminService: ClientAdminService,
    private readonly workingPlanAdminService: WorkingPlanAdminService,
    private readonly procedureAdminService: ProcedureAdminService,
  ) {}

  private addMinutesToTime(time: string, minutesToAdd: number): string {
    const date = dayjs(`1970-01-01T${time}`);
    const newDate = date.add(minutesToAdd, 'minute');

    return newDate.format('HH:mm:ss');
  }

  private isTimeBetween(
    targetTime: string,
    startTime: Date,
    endTime: Date,
  ): boolean {
    const target = dayjs(targetTime, 'HH:mm:ss');
    const start = dayjs(startTime, 'HH:mm:ss');
    const end = dayjs(endTime, 'HH:mm:ss');

    return target.isBetween(start, end, null, '[]');
  }

  private async checkWorkingPlan(
    appointmentCreateDto: AppointmentCreateDto,
    endTime: string,
  ) {
    const workerProgram =
      await this.workingPlanAdminService.getPlansForWorkerAndDay(
        appointmentCreateDto.worker_id,
        appointmentCreateDto.day,
      );

    const checkStartTime = this.isTimeBetween(
      appointmentCreateDto.start_time,
      workerProgram.start_working_hour,
      workerProgram.start_break_hour,
    );

    const checkEndTime = this.isTimeBetween(
      endTime,
      workerProgram.start_working_hour,
      workerProgram.start_break_hour,
    );

    const checkStartTimePM = this.isTimeBetween(
      appointmentCreateDto.start_time,
      workerProgram.end_break_hour,
      workerProgram.end_working_hour,
    );

    const checkEndTimePM = this.isTimeBetween(
      endTime,
      workerProgram.end_break_hour,
      workerProgram.end_working_hour,
    );

    if (
      !(
        (checkStartTime && checkEndTime) ||
        (checkStartTimePM && checkEndTimePM)
      )
    ) {
      throw new BadRequestException('On this time worker does not work');
    }
  }

  private async checkAppointment(appointmentCreateDto: AppointmentCreateDto) {
    //TODO: add validation if there is appointment in this period of time
    const procedure = await this.procedureAdminService.getOneByIdAndWorker(
      appointmentCreateDto.procedure_id,
      appointmentCreateDto.worker_id,
    );
    const endTime = this.addMinutesToTime(
      appointmentCreateDto.start_time,
      procedure.duration,
    );

    await this.checkWorkingPlan(appointmentCreateDto, endTime);

    return {
      ...appointmentCreateDto,
      end_time: endTime,
    };
  }

  async create(appointmentCreateDto: AppointmentCreateDto) {
    const client = await this.clientAdminService.findOrCreate({
      name: appointmentCreateDto.client_name,
      phone: appointmentCreateDto.client_phone,
    });

    const availableAppointment =
      await this.checkAppointment(appointmentCreateDto);

    const existAppointment = await this.appointmentRepository.findOne({
      where: {
        client_id: client.id,
        day: appointmentCreateDto.day,
        start_time: appointmentCreateDto.start_time,
        end_time: availableAppointment.end_time,
      },
    });

    if (existAppointment) {
      throw new BadRequestException(
        'There is an appointment at this time and for this client',
      );
    }

    return await this.appointmentRepository.save({
      ...appointmentCreateDto,
      client_id: client.id,
      status: StatusesEnum.NEW,
      end_time: availableAppointment.end_time,
    });
  }
}
