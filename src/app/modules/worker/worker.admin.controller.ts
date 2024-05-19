import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { WorkerService } from '@/app/modules/worker/worker.service';
import { WorkerItemDto } from '@/app/modules/worker/dto/worker-item.dto';
import {
  PageDto,
  PageOptionsDto,
} from '@/app/response/dto/paginated-response.dto';
import { WorkerCreateDto } from '@/app/modules/worker/dto/worker-create.dto';
import { WorkerUpdateDto } from '@/app/modules/worker/dto/worker-update.dto';

@ApiTags('Admin workers')
@Controller('/admin/workers')
export class WorkerAdminController {
  constructor(private readonly workerService: WorkerService) {}

  @Get()
  @ApiOperation({ summary: 'Get workers' })
  @ApiOkResponse({
    description: 'Worker',
    type: PageDto<WorkerItemDto>,
  })
  async getDetails(
    @Query() pageOptionsDto: PageOptionsDto,
    @Res() response: Response,
  ) {
    return response
      .status(HttpStatus.OK)
      .send(await this.workerService.findAllAndCount(pageOptionsDto));
  }

  @Post()
  @ApiOperation({ summary: 'Worker create' })
  @ApiOkResponse({
    description: 'Worker create',
  })
  async create(
    @Body() workerCreateDto: WorkerCreateDto,
    @Res() response: Response,
  ) {
    return response
      .status(HttpStatus.OK)
      .send(await this.workerService.create(workerCreateDto));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Worker update' })
  @ApiOkResponse({
    description: 'Worker update',
  })
  @ApiParam({ name: 'id', description: 'Worker id', type: 'number' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() workerUpdateDto: WorkerUpdateDto,
    @Res() response: Response,
  ) {
    return response
      .status(HttpStatus.OK)
      .send(await this.workerService.update(id, workerUpdateDto));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Worker delete' })
  @ApiOkResponse({
    description: 'Worker delete',
  })
  @ApiParam({ name: 'id', description: 'Worker id', type: 'number' })
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ) {
    return response
      .status(HttpStatus.OK)
      .send(await this.workerService.delete(id));
  }
}
