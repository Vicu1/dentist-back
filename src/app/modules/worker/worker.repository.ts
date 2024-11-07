import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { WorkerEntity } from '@/app/modules/worker/worker.entity';
import {
  PageDto,
  PageMetaDto,
  PageOptionsDto,
} from '@/app/response/dto/paginated-response.dto';
import { WorkerItemDto } from '@/app/modules/worker/dto/worker-item.dto';

@Injectable()
export class WorkerRepository extends Repository<WorkerEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(WorkerEntity, dataSource.createEntityManager());
  }

  async findAllAndCount(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<WorkerItemDto>> {
    const [entities, itemCount] = await this.findAndCount({
      order: {
        [pageOptionsDto.orderBy || 'id']: pageOptionsDto.order,
      },
      take: pageOptionsDto.per_page,
      relations: ['office', 'procedures'],
      skip: ((pageOptionsDto.page || 1) - 1) * pageOptionsDto.per_page,
    });

    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto,
    });

    return new PageDto(entities, pageMetaDto);
  }

  async getWorkersByProcedure(procedureId: number): Promise<WorkerEntity[]> {
    const query = await this.createQueryBuilder('worker')
      .leftJoinAndSelect('worker.procedures', 'procedure')
      .getMany();

    return query.filter((worker) =>
      worker.procedures.some(
        (procedure) => procedure.procedure_id === procedureId,
      ),
    );
  }
}
