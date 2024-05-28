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
import {
  PageDto,
  PageOptionsDto,
} from '@/app/response/dto/paginated-response.dto';
import { ProcedureAdminService } from '@/app/modules/procedure/admin/procedure.admin.service';
import { ProcedureItemDto } from '@/app/modules/procedure/dto/procedure-item.dto';
import { ProcedureCreateDto } from '@/app/modules/procedure/dto/procedure-create.dto';
import { ProcedureUpdateDto } from '@/app/modules/procedure/dto/procedure-update.dto';

@ApiTags('Admin procedures')
@Controller('/admin/procedures')
export class ProcedureAdminController {
  constructor(private readonly procedureAdminService: ProcedureAdminService) {}

  @Get()
  @ApiOperation({ summary: 'Get procedures' })
  @ApiOkResponse({
    description: 'Procedures',
    type: PageDto<ProcedureItemDto>,
  })
  async getAll(
    @Query() pageOptionsDto: PageOptionsDto,
    @Res() response: Response,
  ) {
    return response
      .status(HttpStatus.OK)
      .send(await this.procedureAdminService.findAllAndCount(pageOptionsDto));
  }
  @Get('/list')
  @ApiOperation({ summary: 'Get procedures list' })
  async getList(@Res() response: Response) {
    return response
      .status(HttpStatus.OK)
      .send(await this.procedureAdminService.getList());
  }

  @Post()
  @ApiOperation({ summary: 'Procedure create' })
  @ApiOkResponse({
    description: 'Procedure create',
  })
  async create(
    @Body() procedureCreateDto: ProcedureCreateDto,
    @Res() response: Response,
  ) {
    return response
      .status(HttpStatus.OK)
      .send(await this.procedureAdminService.create(procedureCreateDto));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Procedure update' })
  @ApiOkResponse({
    description: 'Procedure update',
  })
  @ApiParam({ name: 'id', description: 'Procedure id', type: 'number' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() procedureUpdateDto: ProcedureUpdateDto,
    @Res() response: Response,
  ) {
    return response
      .status(HttpStatus.OK)
      .send(await this.procedureAdminService.update(id, procedureUpdateDto));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Procedure delete' })
  @ApiOkResponse({
    description: 'Procedure delete',
  })
  @ApiParam({ name: 'id', description: 'Procedure id', type: 'number' })
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ) {
    return response
      .status(HttpStatus.OK)
      .send(await this.procedureAdminService.delete(id));
  }
}
