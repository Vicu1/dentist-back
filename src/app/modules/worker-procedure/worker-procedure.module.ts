import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkerProcedureEntity } from '@/app/modules/worker-procedure/worker-procedure.entity';
import { WorkerEntity } from '@/app/modules/worker/worker.entity';
import { ProcedureEntity } from '@/app/modules/procedure/procedure.entity';
import { WorkerProcedureAdminService } from '@/app/modules/worker-procedure/worker-procedure.admin.service';
import { WorkerProcedureRepository } from '@/app/modules/worker-procedure/worker-procedure.repository';
import { ProcedureModule } from '@/app/modules/procedure/procedure.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WorkerProcedureEntity,
      WorkerEntity,
      ProcedureEntity,
    ]),
    ProcedureModule,
  ],
  exports: [WorkerProcedureAdminService],
  providers: [WorkerProcedureAdminService, WorkerProcedureRepository],
})
export class WorkerProcedureModule {}
