import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkingPlanEntity } from '@/app/modules/working-plan/working-plan.entity';
import { WorkingPlanAdminService } from '@/app/modules/working-plan/admin/working-plan.admin.service';
import { WorkingPlanRepository } from '@/app/modules/working-plan/working-plan.repository';

@Module({
  imports: [TypeOrmModule.forFeature([WorkingPlanEntity])],
  providers: [WorkingPlanAdminService, WorkingPlanRepository],
  exports: [WorkingPlanAdminService],
})
export class WorkingPlanModule {}
