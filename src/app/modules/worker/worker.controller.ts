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

@ApiTags('Workers')
@Controller('/workers')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get worker details' })
  @ApiOkResponse({
    description: 'Worker details',
    type: WorkerItemDto,
  })
  @ApiParam({ name: 'id', description: 'Worker id', type: 'number' })
  async getDetails(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ) {
    response.status(HttpStatus.OK).send(await this.workerService.findOne(id));
  }

  @Get()
  @ApiOperation({ summary: 'Get workers' })
  @ApiOkResponse({
    description: 'Workers',
    type: WorkerItemDto,
  })
  async getList(
    @Res() response: Response,
  ) {
    response.status(HttpStatus.OK).send(await this.workerService.findAll());
  }
}
