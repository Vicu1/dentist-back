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
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import {
  PageDto,
  PageOptionsDto,
} from '@/app/response/dto/paginated-response.dto';
import { AppointmentItemDto } from '@/app/modules/appointment/dto/appointment-item.dto';
import { AppointmentAdminService } from '@/app/modules/appointment/admin/appointment.admin.service';
import { AppointmentAdminCreateDto } from '@/app/modules/appointment/dto/appointment-admin-create.dto';
import { AppointmentUpdateDto } from '@/app/modules/appointment/dto/appointment-update.dto';

@ApiTags('Admin appointments')
@Controller('/admin/appointments')
@ApiBearerAuth()
export class AppointmentAdminController {
  constructor(
    private readonly appointmentAdminService: AppointmentAdminService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get appointments' })
  @ApiOkResponse({
    description: 'Appointments',
    type: PageDto<AppointmentItemDto>,
  })
  async getAll(
    @Query() pageOptionsDto: PageOptionsDto,
    @Res() response: Response,
  ) {
    return response
      .status(HttpStatus.OK)
      .send(await this.appointmentAdminService.findAllAndCount(pageOptionsDto));
  }

  @Post()
  @ApiOperation({ summary: 'Appointment create' })
  @ApiOkResponse({
    description: 'Appointment create',
  })
  async create(
    @Body() procedureCreateDto: AppointmentAdminCreateDto,
    @Res() response: Response,
  ) {
    return response
      .status(HttpStatus.OK)
      .send(await this.appointmentAdminService.create(procedureCreateDto));
  }

  @Patch(':id/confirm')
  @ApiOperation({ summary: 'Appointment confirm' })
  @ApiOkResponse({
    description: 'Appointment confirm',
  })
  @ApiParam({ name: 'id', description: 'Appointment id', type: 'number' })
  async confirm(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ) {
    return response
      .status(HttpStatus.OK)
      .send(await this.appointmentAdminService.confirm(id));
  }
  @Patch(':id/reject')
  @ApiOperation({ summary: 'Appointment reject' })
  @ApiOkResponse({
    description: 'Appointment reject',
  })
  @ApiParam({ name: 'id', description: 'Appointment id', type: 'number' })
  async reject(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ) {
    return response
      .status(HttpStatus.OK)
      .send(await this.appointmentAdminService.reject(id));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Appointment update' })
  @ApiOkResponse({
    description: 'Appointment update',
  })
  @ApiParam({ name: 'id', description: 'Appointment id', type: 'number' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
    @Body() appointmentUpdateDto: AppointmentUpdateDto,
  ) {
    return response
      .status(HttpStatus.OK)
      .send(
        await this.appointmentAdminService.partialUpdate(
          id,
          appointmentUpdateDto,
        ),
      );
  }
}
