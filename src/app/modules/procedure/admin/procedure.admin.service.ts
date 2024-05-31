import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PageOptionsDto } from '@/app/response/dto/paginated-response.dto';
import { AdminService } from '@/app/base/admin.service';
import { ProcedureEntity } from '@/app/modules/procedure/procedure.entity';
import { ProcedureRepository } from '@/app/modules/procedure/procedure.repository';

@Injectable()
export class ProcedureAdminService extends AdminService<ProcedureEntity> {
  constructor(private readonly procedureRepository: ProcedureRepository) {
    super(procedureRepository);
  }

  async findAllAndCount(pageOptionsDto: PageOptionsDto) {
    return await this.procedureRepository.findAllAndCount(pageOptionsDto);
  }

  async getList() {
    return await this.procedureRepository.getList();
  }

  async getOneByIdAndWorker(procedureId: number, workerId: number) {
    const procedure = await this.procedureRepository.findOne({
      where: {
        id: procedureId,
      },
      relations: ['workers'],
    });

    if (!procedure) {
      throw new NotFoundException(
        `Procedure with id: ${procedureId} not found`,
      );
    }

    if (procedure.workers.some((worker) => worker.worker_id === workerId)) {
      return procedure;
    }

    throw new BadRequestException(
      `Worker with id: ${workerId} can not do this procedure`,
    );
  }
}
