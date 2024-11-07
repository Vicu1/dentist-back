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
    const query = this.createQueryBuilder('appointment')
      // .leftJoinAndSelect('appointment.client', 'client')
      // .leftJoinAndSelect('appointment.procedure', 'procedure')
      .select('*')
      .orderBy(pageOptionsDto.orderBy || 'day', pageOptionsDto.order || 'DESC')
      .where('appointment.day >= NOW()')
      .take(pageOptionsDto.per_page)
      .skip(((pageOptionsDto.page || 1) - 1) * pageOptionsDto.per_page);

    const pageMetaDto = new PageMetaDto({
      itemCount: await query.getCount(),
      pageOptionsDto,
    });

    return new PageDto(await query.getRawMany(), pageMetaDto);
  }

  async findByWorkerAndDate(workerId: number, date: Date) {
    // Query for appointments within this date range for the worker
    return await this.find({
      where: {
        worker_id: workerId,
        day: date,
      },
      order: { start_time: 'ASC' },
    });
  }
}
