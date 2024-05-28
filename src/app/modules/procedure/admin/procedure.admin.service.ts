import { Injectable } from '@nestjs/common';
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
}
