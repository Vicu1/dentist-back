import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import {
  PageDto,
  PageMetaDto,
  PageOptionsDto,
} from '@/app/response/dto/paginated-response.dto';
import { AppointmentEntity } from '@/app/modules/appointment/appointment.entity';
import { AppointmentItemDto } from '@/app/modules/appointment/dto/appointment-item.dto';

@Injectable()
export class AppointmentRepository extends Repository<AppointmentEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(AppointmentEntity, dataSource.createEntityManager());
  }

  async findAllAndCount(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<AppointmentItemDto>> {
    const [entities, itemCount] = await this.findAndCount({
      order: {
        [pageOptionsDto.orderBy || 'day']: pageOptionsDto.order || 'DESC',
      },
      take: pageOptionsDto.per_page,
      skip: ((pageOptionsDto.page || 1) - 1) * pageOptionsDto.per_page,
    });

    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto,
    });

    return new PageDto(entities, pageMetaDto);
  }
}
