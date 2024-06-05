import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Length } from 'class-validator';

@Exclude()
export class AppointmentCreateDto {
  @Expose()
  @ApiProperty({ example: 'Constantin', description: 'Client name' })
  @Length(3, 100)
  client_name: string;

  @Expose()
  @ApiProperty({ example: 79656546, description: 'Client phone' })
  client_phone: number;

  @Expose()
  @ApiProperty({ example: '2023-09-12', description: 'Name' })
  day: Date;

  @Expose()
  @ApiProperty({ example: '08:30:00', description: 'Start time' })
  start_time: string;

  @Expose()
  @ApiProperty({ example: 'Some comments', description: 'Comment' })
  @Length(10, 200)
  @IsOptional()
  comment: string;

  @Expose()
  @ApiProperty({ example: 1, description: 'Worker' })
  worker_id: number;

  @Expose()
  @ApiProperty({ example: 1, description: 'Procedure' })
  procedure_id: number;
}
