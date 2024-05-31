import { Injectable } from '@nestjs/common';
import { PageOptionsDto } from '@/app/response/dto/paginated-response.dto';
import { AdminService } from '@/app/base/admin.service';
import { ClientEntity } from '@/app/modules/client/client.entity';
import { ClientRepository } from '@/app/modules/client/client.repository';
import { ClientCreateDto } from '@/app/modules/client/dto/client-create.dto';

@Injectable()
export class ClientAdminService extends AdminService<ClientEntity> {
  constructor(private readonly clientRepository: ClientRepository) {
    super(clientRepository);
  }

  async findAllAndCount(pageOptionsDto: PageOptionsDto) {
    return await this.clientRepository.findAllAndCount(pageOptionsDto);
  }

  async findOrCreate(clientCreateDto: ClientCreateDto) {
    const client = await this.clientRepository.findOne({
      where: { phone: clientCreateDto.phone },
    });

    if (!client) {
      return await this.clientRepository.save(clientCreateDto);
    }

    //TODO: check if client is blocked

    return client;
  }
}
