import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PageOptionsDto } from '@/app/response/dto/paginated-response.dto';
import { AdminService } from '@/app/base/admin.service';
import { ProcedureEntity } from '@/app/modules/procedure/procedure.entity';
import { ProcedureRepository } from '@/app/modules/procedure/procedure.repository';
import {WorkerProcedureRepository} from "@/app/modules/worker-procedure/worker-procedure.repository";

@Injectable()
export class ProcedureAdminService extends AdminService<ProcedureEntity> {
  constructor(private readonly procedureRepository: ProcedureRepository,
              private readonly workerProcedureRepository: WorkerProcedureRepository) {
    super(procedureRepository);
  }

  async findAllAndCount(pageOptionsDto: PageOptionsDto) {
    return await this.procedureRepository.findAllAndCount(pageOptionsDto);
  }

  async getList() {
    return await this.procedureRepository.getList();
  }

  async getOneByIdAndWorker(procedureId: number, workerId: number) {
    const existingRelation = await this.workerProcedureRepository.findOne({
      where: {
        worker_id: workerId,
        procedure_id: procedureId
      },
      relations: ['procedure', 'worker'],
    });

    if (!existingRelation) {
      throw new BadRequestException(
          `Worker with id: ${workerId} can not do this procedure`,
      );
    }

    return {
      ...existingRelation.procedure
    }

  }
}
