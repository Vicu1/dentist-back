import {
  ApiBearerAuth,
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
import { OfficeService } from '@/app/modules/office/office.service';
import { OfficeItemDto } from '@/app/modules/office/dto/office-item.dto';
import { OfficeCreateDto } from '@/app/modules/office/dto/office-create.dto';
import { OfficeUpdateDto } from '@/app/modules/office/dto/office-update.dto';

@ApiTags('Admin offices')
@Controller('/admin/offices')
@ApiBearerAuth()
export class OfficeAdminController {
  constructor(private readonly officeService: OfficeService) {}

  @Get()
  @ApiOperation({ summary: 'Get offices' })
  @ApiOkResponse({
    description: 'Offices',
    type: PageDto<OfficeItemDto>,
  })
  async getAll(
    @Query() pageOptionsDto: PageOptionsDto,
    @Res() response: Response,
  ) {
    return response
      .status(HttpStatus.OK)
      .send(await this.officeService.findAllAndCount(pageOptionsDto));
  }

  @Post()
  @ApiOperation({ summary: 'Office create' })
  @ApiOkResponse({
    description: 'Office create',
  })
  async create(
    @Body() officeCreateDto: OfficeCreateDto,
    @Res() response: Response,
  ) {
    return response
      .status(HttpStatus.OK)
      .send(await this.officeService.create(officeCreateDto));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Office update' })
  @ApiOkResponse({
    description: 'Office update',
  })
  @ApiParam({ name: 'id', description: 'Office id', type: 'number' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() officeUpdateDto: OfficeUpdateDto,
    @Res() response: Response,
  ) {
    return response
      .status(HttpStatus.OK)
      .send(await this.officeService.update(id, officeUpdateDto));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Office delete' })
  @ApiOkResponse({
    description: 'Office delete',
  })
  @ApiParam({ name: 'id', description: 'Office id', type: 'number' })
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ) {
    return response
      .status(HttpStatus.OK)
      .send(await this.officeService.delete(id));
  }
}
