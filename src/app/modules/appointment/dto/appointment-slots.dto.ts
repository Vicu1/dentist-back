import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class AppointmentSlotsDto {
  @ApiProperty({ example: 'Date', description: 'Date' })
  @Expose()
  date: string;
}
