import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { WorkingPlanEntity } from '@/app/modules/working-plan/working-plan.entity';

@Injectable()
export class WorkingPlanRepository extends Repository<WorkingPlanEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(WorkingPlanEntity, dataSource.createEntityManager());
  }
}
