import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { WorkerItemDto } from '@/app/modules/worker/dto/worker-item.dto';
import { WorkerService } from '@/app/modules/worker/worker.service';
import {ProcedureItemDto} from "@/app/modules/procedure/dto/procedure-item.dto";
import {ProcedureService} from "@/app/modules/procedure/procedure.service";

@ApiTags('Procedures')
@Controller('/procedures')
export class ProcedureController {
  constructor(private readonly procedureService: ProcedureService) {}

  @Get()
  @ApiOperation({ summary: 'Get procedures' })
  @ApiOkResponse({
    description: 'Procedures',
    type: ProcedureItemDto,
  })
  async getProcedures(
    @Res() response: Response,
  ) {
    response.status(HttpStatus.OK).send(await this.procedureService.findAll());
  }
}
