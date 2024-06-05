import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentEntity } from '@/app/modules/appointment/appointment.entity';
import { AppointmentAdminController } from '@/app/modules/appointment/admin/appointment.admin.controller';
import { AppointmentRepository } from '@/app/modules/appointment/appointment.repository';
import { AppointmentAdminService } from '@/app/modules/appointment/admin/appointment.admin.service';
import { AppointmentService } from '@/app/modules/appointment/appointment.service';
import { AppointmentController } from '@/app/modules/appointment/appointment.controller';
import { ClientModule } from '@/app/modules/client/client.module';
import { WorkingPlanModule } from '@/app/modules/working-plan/working-plan.module';
import { ProcedureModule } from '@/app/modules/procedure/procedure.module';
import { AppointmentNotifyService } from '@/app/modules/appointment/appointment.notify.service';
import { WorkerModule } from '@/app/modules/worker/worker.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AppointmentEntity]),
    ClientModule,
    WorkingPlanModule,
    ProcedureModule,
    WorkerModule,
  ],
  controllers: [AppointmentAdminController, AppointmentController],
  providers: [
    AppointmentRepository,
    AppointmentAdminService,
    AppointmentService,
    AppointmentNotifyService,
  ],
})
export class AppointmentModule {}
