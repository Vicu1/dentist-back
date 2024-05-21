import { HttpException, Injectable } from '@nestjs/common';
import {
  DeleteResult,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { DeepPartial } from 'typeorm/common/DeepPartial';
@Injectable()
export class AdminService<Entity> {
  constructor(private readonly repository: Repository<Entity>) {}

  async findOne(options?: FindOneOptions<Entity>): Promise<Entity> {
    return this.repository.findOne(options);
  }

  async create(entity: DeepPartial<Entity>): Promise<Entity> {
    return this.repository.save(entity);
  }

  async update(
    id: number,
    updateData: QueryDeepPartialEntity<Entity>,
  ): Promise<UpdateResult> {
    return this.repository.update(id, updateData);
  }

  async delete(id: number): Promise<DeleteResult> {
    try {
      return await this.repository.delete(id);
    } catch (e) {
      throw new HttpException('Cant delete entity with relations', 400);
    }
  }
}
