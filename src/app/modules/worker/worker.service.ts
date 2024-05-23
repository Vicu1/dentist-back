import { Injectable } from '@nestjs/common';
import { WorkerRepository } from '@/app/modules/worker/worker.repository';

@Injectable()
export class WorkerService {
  constructor(private readonly workerRepository: WorkerRepository) {}

  async findOne(id: number) {
    return await this.workerRepository.findOne({ where: { id } });
  }
}
