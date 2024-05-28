import { Module } from '@nestjs/common';
import { WorkingPlanAdminService } from '@/app/modules/working-plan/admin/working-plan.admin.service';
import { WorkingPlanRepository } from '@/app/modules/working-plan/working-plan.repository';
import { WorkingPlanAdminController } from '@/app/modules/working-plan/admin/working-plan.admin.controller';

@Module({
  providers: [WorkingPlanAdminService, WorkingPlanRepository],
  controllers: [WorkingPlanAdminController],
  exports: [WorkingPlanAdminService],
})
export class WorkingPlanModule {}
