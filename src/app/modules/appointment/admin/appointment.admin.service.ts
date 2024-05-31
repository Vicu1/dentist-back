import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PageOptionsDto } from '@/app/response/dto/paginated-response.dto';
import { AdminService } from '@/app/base/admin.service';
import { AppointmentRepository } from '@/app/modules/appointment/appointment.repository';
import { AppointmentEntity } from '@/app/modules/appointment/appointment.entity';
import { StatusesEnum } from '@/app/modules/appointment/types/statuses.enum';
import { AppointmentUpdateDto } from '@/app/modules/appointment/dto/appointment-update.dto';

@Injectable()
export class AppointmentAdminService extends AdminService<AppointmentEntity> {
  constructor(private readonly appointmentRepository: AppointmentRepository) {
    super(appointmentRepository);
  }

  async findAllAndCount(pageOptionsDto: PageOptionsDto) {
    return await this.appointmentRepository.findAllAndCount(pageOptionsDto);
  }

  async partialUpdate(id: number, appointmentUpdateDto: AppointmentUpdateDto) {
    //TODO: Add validation
    await this.appointmentRepository.update(id, appointmentUpdateDto);
  }

  async confirm(id: number) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment with id: ${id} not found`);
    }

    if (appointment.status !== StatusesEnum.NEW) {
      throw new BadRequestException(`You can confirm only new appointments`);
    }

    return await this.appointmentRepository.update(id, {
      status: StatusesEnum.CONFIRMED,
    });
  }

  async reject(id: number) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment with id: ${id} not found`);
    }

    if (appointment.status !== StatusesEnum.NEW) {
      throw new BadRequestException(`You can reject only new appointments`);
    }

    return await this.appointmentRepository.update(id, {
      status: StatusesEnum.REJECTED,
    });
  }
}
