import { Injectable } from '@nestjs/common';
import { WorkerRepository } from '@/app/modules/worker/worker.repository';
import { PageOptionsDto } from '@/app/response/dto/paginated-response.dto';
import { AdminService } from '@/app/base/admin.service';
import { WorkerEntity } from '@/app/modules/worker/worker.entity';
import { WorkerCreateDto } from '@/app/modules/worker/dto/worker-create.dto';
import { WorkingPlanAdminService } from '@/app/modules/working-plan/admin/working-plan.admin.service';
import { WorkerProcedureAdminService } from '@/app/modules/worker-procedure/worker-procedure.admin.service';
import { WorkerUpdateDto } from '@/app/modules/worker/dto/worker-update.dto';

@Injectable()
export class WorkerAdminService extends AdminService<WorkerEntity> {
  constructor(
    private readonly workerRepository: WorkerRepository,
    private readonly workingPlanAdminService: WorkingPlanAdminService,
    private readonly workerProcedureAdminService: WorkerProcedureAdminService,
  ) {
    super(workerRepository);
  }

  async findAllAndCount(pageOptionsDto: PageOptionsDto) {
    return await this.workerRepository.findAllAndCount(pageOptionsDto);
  }

  async findOneWithProcedures(id: number) {
    const worker = await this.workerRepository.findOne({
      where: { id },
      relations: ['procedures'],
    });

    return {
      ...worker,
      procedures: worker.procedures.map((procedure) => procedure.procedure_id),
    };
  }

  getList() {
    return this.workerRepository
      .createQueryBuilder('worker')
      .select([
        'worker.id as id',
        "CONCAT(worker.first_name, ' ', worker.last_name) as name",
      ])
      .getRawMany();
  }

  async createAndAddWorkingPlans(workerCreateDto: WorkerCreateDto) {
    const worker = await this.workerRepository.save({
      ...workerCreateDto,
      procedures: [],
    });
    await this.workingPlanAdminService.create(worker.id);
    await this.workerProcedureAdminService.create(
      worker.id,
      workerCreateDto.procedures,
    );
  }

  async updateAndChangeProcedures(
    id: number,
    workerUpdateDto: WorkerUpdateDto,
  ) {
    const { procedures, ...workerData } = workerUpdateDto;
    await this.workerRepository.update(id, {
      ...workerData,
    });
    await this.workerProcedureAdminService.update(id, procedures);
  }
}
