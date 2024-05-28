import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { WorkerProcedureEntity } from '@/app/modules/worker-procedure/worker-procedure.entity';

@Injectable()
export class WorkerProcedureRepository extends Repository<WorkerProcedureEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(WorkerProcedureEntity, dataSource.createEntityManager());
  }
}
