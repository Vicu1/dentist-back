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
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { AppointmentService } from '@/app/modules/appointment/appointment.service';
import { AppointmentCreateDto } from '@/app/modules/appointment/dto/appointment-create.dto';
import { Response } from 'express';
import { AppointmentSlotsDto } from '@/app/modules/appointment/dto/appointment-slots.dto';

@ApiTags('Appointments')
@Controller('/appointments')
@ApiBearerAuth()
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  @ApiOperation({ summary: 'Appointment create' })
  @ApiOkResponse({
    description: 'Appointment create',
  })
  async create(
    @Body() appointmentCreateDto: AppointmentCreateDto,
    @Res() response: Response,
  ) {
    return response
      .status(HttpStatus.OK)
      .send(await this.appointmentService.create(appointmentCreateDto));
  }

  @Get('/procedure/:procedure_id/worker/:worked_id')
  @ApiOperation({ summary: 'Appointment slots' })
  @ApiOkResponse({
    description: 'Appointment slots',
  })
  @ApiParam({
    name: 'procedure_id',
    description: 'Procedure id',
    type: 'number',
  })
  @ApiParam({ name: 'worked_id', description: 'Worker id', type: 'number' })
  async getSlots(
    @Res() response: Response,
    @Param('procedure_id', ParseIntPipe) procedureId: number,
    @Param('worked_id', ParseIntPipe) workerId: number,
    @Query() appointmentSlotsDto: AppointmentSlotsDto,
  ) {
    return response
      .status(HttpStatus.OK)
      .send(
        await this.appointmentService.getSlots(
          procedureId,
          workerId,
          appointmentSlotsDto,
        ),
      );
  }
}
