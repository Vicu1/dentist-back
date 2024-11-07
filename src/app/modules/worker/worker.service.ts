import { Injectable } from '@nestjs/common';
import { WorkerRepository } from '@/app/modules/worker/worker.repository';

@Injectable()
export class WorkerService {
  constructor(private readonly workerRepository: WorkerRepository) {}

  async findOne(id: number) {
    return await this.workerRepository.findOne({ where: { id } });
  }

  async findOneWithWorkingPeriod(id: number) {
    return await this.workerRepository.findOne({
      where: { id },
      relations: ['working_plans'],
    });
  }

  async findAll() {
    return await this.workerRepository.find();
  }

  async getByProcedure(id: number) {
    return await this.workerRepository.getWorkersByProcedure(id);
  }
}
