import { Injectable } from '@nestjs/common';
import { PageOptionsDto } from '@/app/response/dto/paginated-response.dto';
import { AdminService } from '@/app/base/admin.service';
import { ClientEntity } from '@/app/modules/client/client.entity';
import { ClientRepository } from '@/app/modules/client/client.repository';
import { ClientCreateDto } from '@/app/modules/client/dto/client-create.dto';
import { AppointmentAdminService } from '@/app/modules/appointment/admin/appointment.admin.service';

@Injectable()
export class ClientAdminService extends AdminService<ClientEntity> {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly appointmentAdminService: AppointmentAdminService,
  ) {
    super(clientRepository);
  }

  async findAllAndCount(pageOptionsDto: PageOptionsDto) {
    return await this.clientRepository.findAllAndCount(pageOptionsDto);
  }

  async block(id: number) {
    await this.appointmentAdminService.markAppointmentsAsCanceled(id);
    return this.clientRepository.update(id, { is_blocked: true });
  }

  async unblock(id: number) {
    return await this.clientRepository.update(id, { is_blocked: false });
  }

  async findOrCreate(clientCreateDto: ClientCreateDto) {
    const client = await this.clientRepository.findOne({
      where: { phone: clientCreateDto.phone },
    });

    if (!client) {
      return await this.clientRepository.save(clientCreateDto);
    }

    return client;
  }
}
