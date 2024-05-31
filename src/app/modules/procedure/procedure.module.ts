import { Module } from '@nestjs/common';
import { ProcedureAdminService } from '@/app/modules/procedure/admin/procedure.admin.service';
import { ProcedureRepository } from '@/app/modules/procedure/procedure.repository';
import { ProcedureAdminController } from '@/app/modules/procedure/admin/procedure.admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcedureEntity } from '@/app/modules/procedure/procedure.entity';
import { WorkerProcedureEntity } from '@/app/modules/worker-procedure/worker-procedure.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProcedureEntity, WorkerProcedureEntity])],
  controllers: [ProcedureAdminController],
  exports: [ProcedureRepository, ProcedureAdminService],
  providers: [ProcedureAdminService, ProcedureRepository],
})
export class ProcedureModule {}
