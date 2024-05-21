import { Injectable } from '@nestjs/common';
import { WorkerRepository } from '@/app/modules/worker/worker.repository';
import { PageOptionsDto } from '@/app/response/dto/paginated-response.dto';
import { WorkerCreateDto } from '@/app/modules/worker/dto/worker-create.dto';
import { WorkerUpdateDto } from '@/app/modules/worker/dto/worker-update.dto';

@Injectable()
export class WorkerService {
  constructor(private readonly workerRepository: WorkerRepository) {}

  async findAllAndCount(pageOptionsDto: PageOptionsDto) {
    return await this.workerRepository.findAllAndCount(pageOptionsDto);
  }

  async findOne(id: number) {
    return await this.workerRepository.findOne({ where: { id } });
  }

  async create(workerCreateDto: WorkerCreateDto) {
    return this.workerRepository.create(workerCreateDto);
  }

  async update(id: number, workerUpdateDto: WorkerUpdateDto) {
    return this.workerRepository.update(id, workerUpdateDto);
  }

  async delete(id: number) {
    return this.workerRepository.delete(id);
  }
}
