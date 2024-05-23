import { Injectable } from '@nestjs/common';
import { WorkerRepository } from '@/app/modules/worker/worker.repository';
import { PageOptionsDto } from '@/app/response/dto/paginated-response.dto';
import { AdminService } from '@/app/base/admin.service';
import { WorkerEntity } from '@/app/modules/worker/worker.entity';
import { WorkerCreateDto } from '@/app/modules/worker/dto/worker-create.dto';
import { WorkingPlanAdminService } from '@/app/modules/working-plan/admin/working-plan.admin.service';

@Injectable()
export class WorkerAdminService extends AdminService<WorkerEntity> {
  constructor(
    private readonly workerRepository: WorkerRepository,
    private readonly workingPlanAdminService: WorkingPlanAdminService,
  ) {
    super(workerRepository);
  }

  async findAllAndCount(pageOptionsDto: PageOptionsDto) {
    return await this.workerRepository.findAllAndCount(pageOptionsDto);
  }

  async createAndAddWorkingPlans(workerCreateDto: WorkerCreateDto) {
    const worker = await this.workerRepository.save(workerCreateDto);
    await this.workingPlanAdminService.create(worker.id);
  }
}
