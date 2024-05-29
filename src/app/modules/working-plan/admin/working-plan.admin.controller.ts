import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { WorkingPlanAdminService } from '@/app/modules/working-plan/admin/working-plan.admin.service';
import { WorkingPlanItemDto } from '@/app/modules/working-plan/dto/working-plan-item.dto';
import { WorkingPlanUpdateDto } from '@/app/modules/working-plan/dto/working-plan-update.dto';

@ApiTags('Admin working plans')
@Controller('/admin/working-plans')
@ApiBearerAuth()
export class WorkingPlanAdminController {
  constructor(
    private readonly workingPlanAdminService: WorkingPlanAdminService,
  ) {}

  @Get(':worker_id')
  @ApiOperation({ summary: 'Get working plans for worker' })
  @ApiParam({ name: 'worker_id', description: 'Worker id', type: 'number' })
  @ApiOkResponse({
    description: 'Working plan',
    type: WorkingPlanItemDto,
    isArray: true,
  })
  async getPlansForWorker(
    @Param('worker_id', ParseIntPipe) worker_id: number,
    @Res() response: Response,
  ) {
    return response
      .status(HttpStatus.OK)
      .send(await this.workingPlanAdminService.getPlansForWorker(worker_id));
  }

  @Put()
  @ApiOperation({ summary: 'Working plan update' })
  @ApiOkResponse({
    description: 'Working plan update',
  })
  @ApiBody({
    description: 'Working plan',
    type: WorkingPlanItemDto,
    isArray: true,
  })
  async update(
    @Body() workingPlanUpdateDto: WorkingPlanUpdateDto[],
    @Res() response: Response,
  ) {
    return response
      .status(HttpStatus.OK)
      .send(await this.workingPlanAdminService.update(workingPlanUpdateDto));
  }
}
