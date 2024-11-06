import {forwardRef, Module} from '@nestjs/common';
import { ProcedureAdminService } from '@/app/modules/procedure/admin/procedure.admin.service';
import { ProcedureRepository } from '@/app/modules/procedure/procedure.repository';
import { ProcedureAdminController } from '@/app/modules/procedure/admin/procedure.admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcedureEntity } from '@/app/modules/procedure/procedure.entity';
import { WorkerProcedureEntity } from '@/app/modules/worker-procedure/worker-procedure.entity';
import {ProcedureService} from "@/app/modules/procedure/procedure.service";
import {ProcedureController} from "@/app/modules/procedure/procedure.controller";
import {WorkerProcedureModule} from "@/app/modules/worker-procedure/worker-procedure.module";

@Module({
  imports: [TypeOrmModule.forFeature([ProcedureEntity, WorkerProcedureEntity]), forwardRef(() => WorkerProcedureModule)],
  controllers: [ProcedureAdminController, ProcedureController],
  exports: [ProcedureRepository, ProcedureAdminService],
  providers: [ProcedureAdminService, ProcedureRepository, ProcedureService ],
})
export class ProcedureModule {}
