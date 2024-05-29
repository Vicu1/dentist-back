import { ParseTokenMiddleware } from '@/app/middlewares/middleware/parse-token.middleware';
import { WorkerAdminController } from '@/app/modules/worker/admin/worker.admin.controller';
import { OfficeAdminController } from '@/app/modules/office/office.admin.controller';
import { WorkingPlanAdminController } from '@/app/modules/working-plan/admin/working-plan.admin.controller';
import { ProcedureAdminController } from '@/app/modules/procedure/admin/procedure.admin.controller';

export default [
  {
    guard: ParseTokenMiddleware,
    routes: WorkerAdminController,
  },
  {
    guard: ParseTokenMiddleware,
    routes: OfficeAdminController,
  },
  {
    guard: ParseTokenMiddleware,
    routes: WorkingPlanAdminController,
  },
  {
    guard: ParseTokenMiddleware,
    routes: ProcedureAdminController,
  },
];
