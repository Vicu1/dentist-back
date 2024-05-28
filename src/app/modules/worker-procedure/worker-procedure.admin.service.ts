import { Injectable, NotFoundException } from '@nestjs/common';
import { WorkerProcedureRepository } from '@/app/modules/worker-procedure/worker-procedure.repository';
import { ProcedureRepository } from '@/app/modules/procedure/procedure.repository';

@Injectable()
export class WorkerProcedureAdminService {
  constructor(
    private readonly workerProcedureRepository: WorkerProcedureRepository,
    private readonly procedureRepository: ProcedureRepository,
  ) {}

  async create(workerId: number, procedureIds: number[]) {
    for (const procedureId of procedureIds) {
      const procedure = await this.procedureRepository.findOne({
        where: { id: procedureId },
      });
      if (!procedure) {
        throw new NotFoundException(
          `Procedure with ID ${procedureId} not found`,
        );
      }
      await this.workerProcedureRepository.save({
        worker_id: workerId,
        procedure_id: procedureId,
      });
    }
  }

  async update(workerId: number, procedureIds: number[]) {
    if (procedureIds.length) {
      await this.workerProcedureRepository.delete({ worker_id: workerId });
      await this.create(workerId, procedureIds);
    }
  }
}
