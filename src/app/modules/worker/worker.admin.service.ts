import { Injectable } from '@nestjs/common';
import { WorkerRepository } from '@/app/modules/worker/worker.repository';
import { PageOptionsDto } from '@/app/response/dto/paginated-response.dto';
import { AdminService } from '@/app/base/admin.service';
import { WorkerEntity } from '@/app/modules/worker/worker.entity';

@Injectable()
export class WorkerAdminService extends AdminService<WorkerEntity> {
  constructor(private readonly workerRepository: WorkerRepository) {
    super(workerRepository);
  }

  async findAllAndCount(pageOptionsDto: PageOptionsDto) {
    return await this.workerRepository.findAllAndCount(pageOptionsDto);
  }
}
