import { Module } from '@nestjs/common';
import { WorkerController } from '@/app/modules/worker/worker.controller';
import { WorkerAdminController } from '@/app/modules/worker/admin/worker.admin.controller';
import { WorkerService } from '@/app/modules/worker/worker.service';
import { WorkerRepository } from '@/app/modules/worker/worker.repository';
import { WorkerAdminService } from '@/app/modules/worker/admin/worker.admin.service';
import { WorkingPlanModule } from '@/app/modules/working-plan/working-plan.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkerEntity } from '@/app/modules/worker/worker.entity';
import { WorkingPlanEntity } from '@/app/modules/working-plan/working-plan.entity';
import { OfficeEntity } from '@/app/modules/office/office.entity';
import { WorkerProcedureModule } from '@/app/modules/worker-procedure/worker-procedure.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkerEntity, WorkingPlanEntity, OfficeEntity]),
    WorkingPlanModule,
    WorkerProcedureModule,
  ],
  controllers: [WorkerAdminController, WorkerController],
  providers: [WorkerService, WorkerAdminService, WorkerRepository],
})
export class WorkerModule {}
