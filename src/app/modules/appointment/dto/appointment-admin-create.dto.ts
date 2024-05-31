import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Length } from 'class-validator';

@Exclude()
export class AppointmentAdminCreateDto {
  @Expose()
  @ApiProperty({ example: '01.09.2023', description: 'Name' })
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
  @ApiProperty({ example: 1, description: 'Procedure' })
  procedure_id: number;
}
