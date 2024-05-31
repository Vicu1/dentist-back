import { WorkerModule } from '@/app/modules/worker/worker.module';
import { WorkingPlanModule } from '@/app/modules/working-plan/working-plan.module';
import { OfficeModule } from '@/app/modules/office/office.module';
import { ProcedureModule } from '@/app/modules/procedure/procedure.module';
import { WorkerProcedureModule } from '@/app/modules/worker-procedure/worker-procedure.module';
import { UserModule } from '@/app/modules/user/user.module';
import { AuthModule } from '@/app/modules/auth/auth.module';
import { AppointmentModule } from '@/app/modules/appointment/appointment.module';
import { ClientModule } from '@/app/modules/client/client.module';

export default [
  OfficeModule,
  WorkerModule,
  WorkingPlanModule,
  ProcedureModule,
  WorkerProcedureModule,
  UserModule,
  AuthModule,
  AppointmentModule,
  ClientModule,
];
