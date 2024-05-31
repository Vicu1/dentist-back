import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { StatusesEnum } from '@/app/modules/appointment/types/statuses.enum';

@Exclude()
export class AppointmentItemDto {
  @Expose()
  @ApiProperty({ example: 1, description: 'Id' })
  id: number;

  @Expose()
  @ApiProperty({ example: '01.09.2023', description: 'Name' })
  day: Date;

  @Expose()
  @ApiProperty({ example: '08:30:00', description: 'Start time' })
  start_time: string;

  @Expose()
  @ApiProperty({ example: '09:00:00', description: 'End time' })
  end_time: string;

  @Expose()
  @ApiProperty({ example: StatusesEnum.NEW, description: 'Status' })
  status: StatusesEnum;
}
