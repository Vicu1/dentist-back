import { Injectable } from '@nestjs/common';
import { AdminService } from '@/app/base/admin.service';
import { OfficeEntity } from '@/app/modules/office/office.entity';
import { OfficeRepository } from '@/app/modules/office/office.repository';
import { PageOptionsDto } from '@/app/response/dto/paginated-response.dto';

@Injectable()
export class OfficeService extends AdminService<OfficeEntity> {
  constructor(private readonly officeRepository: OfficeRepository) {
    super(officeRepository);
  }

  async findAllAndCount(pageOptionsDto: PageOptionsDto) {
    return await this.officeRepository.findAllAndCount(pageOptionsDto);
  }
}
