import { Module } from '@nestjs/common';
import { WorkerController } from '@/app/modules/worker/worker.controller';
import { WorkerAdminController } from '@/app/modules/worker/admin/worker.admin.controller';
import { WorkerService } from '@/app/modules/worker/worker.service';
import { WorkerRepository } from '@/app/modules/worker/worker.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkerEntity } from '@/app/modules/worker/worker.entity';
import { WorkerAdminService } from '@/app/modules/worker/admin/worker.admin.service';
import { OfficeEntity } from '@/app/modules/office/office.entity';
import { WorkingPlanModule } from '@/app/modules/working-plan/working-plan.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkerEntity, OfficeEntity]),
    WorkingPlanModule,
  ],
  controllers: [WorkerAdminController, WorkerController],
  providers: [WorkerService, WorkerAdminService, WorkerRepository],
})
export class WorkerModule {}
