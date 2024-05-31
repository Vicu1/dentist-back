import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AppointmentService } from '@/app/modules/appointment/appointment.service';
import { AppointmentCreateDto } from '@/app/modules/appointment/dto/appointment-create.dto';
import { Response } from 'express';

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
}
