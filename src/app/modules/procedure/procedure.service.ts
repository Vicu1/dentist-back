import {Injectable} from "@nestjs/common";
import {WorkerRepository} from "@/app/modules/worker/worker.repository";
import {ProcedureRepository} from "@/app/modules/procedure/procedure.repository";

@Injectable()
export class ProcedureService {
    constructor(private readonly procedureRepository: ProcedureRepository) {}

    async findAll() {
        return await this.procedureRepository.find();
    }
}