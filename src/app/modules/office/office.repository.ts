import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import {
  PageDto,
  PageMetaDto,
  PageOptionsDto,
} from '@/app/response/dto/paginated-response.dto';
import { OfficeEntity } from '@/app/modules/office/office.entity';
import { OfficeItemDto } from '@/app/modules/office/dto/office-item.dto';

@Injectable()
export class OfficeRepository extends Repository<OfficeEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(OfficeEntity, dataSource.createEntityManager());
  }

  async findAllAndCount(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<OfficeItemDto>> {
    const [entities, itemCount] = await this.findAndCount({
      order: {
        [pageOptionsDto.orderBy || 'id']: pageOptionsDto.order,
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
