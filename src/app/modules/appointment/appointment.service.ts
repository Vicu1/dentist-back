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
import { AppointmentNotifyService } from '@/app/modules/appointment/appointment.notify.service';
import { WorkerService } from '@/app/modules/worker/worker.service';

dayjs.extend(isBetween);
dayjs.extend(customParseFormat);
@Injectable()
export class AppointmentService {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly clientAdminService: ClientAdminService,
    private readonly workingPlanAdminService: WorkingPlanAdminService,
    private readonly procedureAdminService: ProcedureAdminService,
    private readonly appointmentNotifyService: AppointmentNotifyService,
    private readonly workerService: WorkerService,
  ) {}

  private addMinutesToTime(time: string, minutesToAdd: number): string {
    const date = dayjs(`1970-01-01T${time}`);
    const newDate = date.add(minutesToAdd, 'minute');

    return newDate.format('HH:mm');
  }

  private isTimeBetween(
    targetTime: string,
    startTime: Date,
    endTime: Date,
  ): boolean {
    const target = dayjs(targetTime, 'HH:mm');
    const start = dayjs(startTime, 'HH:mm');
    const end = dayjs(endTime, 'HH:mm');

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
    const procedure = await this.procedureAdminService.getOneByIdAndWorker(
      appointmentCreateDto.procedure_id,
      appointmentCreateDto.worker_id,
    );
    console.log(procedure)
    const endTime = this.addMinutesToTime(
      appointmentCreateDto.start_time,
      procedure.duration,
    );

    const today = dayjs().startOf('day');
    const oneDayAfterToday = today.add(1, 'day');
    const twoWeeksFromToday = today.add(14, 'day');

    const appointmentDay = dayjs(appointmentCreateDto.day);
    if (
      appointmentDay.isBefore(oneDayAfterToday) ||
      appointmentDay.isAfter(twoWeeksFromToday)
    ) {
      throw new BadRequestException(
        'Appointment day must be at least one day after today and not more than 2 weeks from today.',
      );
    }

    const existingAppointments = await this.appointmentRepository.find({
      where: {
        day: appointmentCreateDto.day,
        status: StatusesEnum.NEW || StatusesEnum.CONFIRMED,
      },
    });
    const newStart = dayjs(
      `${appointmentCreateDto.day}T${appointmentCreateDto.start_time}`,
    );
    const newEnd = dayjs(`${appointmentCreateDto.day}T${endTime}`);

    for (const appointment of existingAppointments) {
      const existingStart = dayjs(
        `${appointment.day}T${appointment.start_time}`,
      );
      const existingEnd = dayjs(`${appointment.day}T${appointment.end_time}`);

      if (
        newStart.isBetween(existingStart, existingEnd, null, '[)') ||
        newEnd.isBetween(existingStart, existingEnd, null, '(]') ||
        (newStart.isBefore(existingStart) && newEnd.isAfter(existingEnd))
      ) {
        throw new BadRequestException(
          'Appointment time conflicts with an existing appointment.',
        );
      }
    }

    await this.checkWorkingPlan(appointmentCreateDto, endTime);

    const worker = await this.workerService.findOne(
      appointmentCreateDto.worker_id,
    );

    return {
      ...appointmentCreateDto,
      end_time: endTime,
      procedure,
      worker_name: `${worker.first_name} ${worker.last_name}`,
    };
  }

  async create(appointmentCreateDto: AppointmentCreateDto) {
    const client = await this.clientAdminService.findOrCreate({
      name: appointmentCreateDto.client_name,
      phone: appointmentCreateDto.client_phone,
    });

    if (client.is_blocked) {
      throw new BadRequestException('Вы не можешь записаться на прием');
    }

    const availableAppointment =
      await this.checkAppointment(appointmentCreateDto);

    const appointment = await this.appointmentRepository.save({
      ...appointmentCreateDto,
      client_id: client.id,
      status: StatusesEnum.NEW,
      end_time: availableAppointment.end_time,
    });

    await this.appointmentNotifyService.sendTelegramNotification(
      appointmentCreateDto,
      availableAppointment.end_time,
      availableAppointment.procedure.name,
      availableAppointment.worker_name,
    );

    return appointment;
  }
}
