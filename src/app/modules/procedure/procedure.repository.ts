import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import {
  PageDto,
  PageMetaDto,
  PageOptionsDto,
} from '@/app/response/dto/paginated-response.dto';
import { ProcedureEntity } from '@/app/modules/procedure/procedure.entity';
import { ProcedureItemDto } from '@/app/modules/procedure/dto/procedure-item.dto';

@Injectable()
export class ProcedureRepository extends Repository<ProcedureEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ProcedureEntity, dataSource.createEntityManager());
  }

  async findAllAndCount(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<ProcedureItemDto>> {
    const [entities, itemCount] = await this.findAndCount({
      order: {
        [pageOptionsDto.orderBy || 'id']: pageOptionsDto.order,
      },
      take: pageOptionsDto.per_page,
      relations: ['workers'],
      skip: ((pageOptionsDto.page || 1) - 1) * pageOptionsDto.per_page,
    });

    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto,
    });

    return new PageDto(entities, pageMetaDto);
  }

  async getList() {
    return await this.find({
      select: ['id', 'name'],
    });
  }
}
