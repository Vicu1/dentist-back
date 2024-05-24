import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { WeekDaysEnum } from '@/app/modules/working-plan/types/week-days.enum';

@Exclude()
export class WorkingPlanUpdateDto {
  @Expose()
  @ApiProperty({ example: 1, description: 'Id' })
  id: number;

  @Expose()
  @ApiProperty({
    example: WeekDaysEnum.MONDAY,
    description: 'Week day',
    type: 'enum',
  })
  @IsEnum(WeekDaysEnum)
  working_day: WeekDaysEnum;

  @Expose()
  @ApiProperty({ example: '08:00:00', description: 'Start working hour' })
  start_working_hour: Date;

  @Expose()
  @ApiProperty({ example: '17:00:00', description: 'End working hour' })
  end_working_hour: Date;

  @Expose()
  @ApiProperty({ example: '12:00:00', description: 'Start break hour' })
  start_break_hour: Date;

  @Expose()
  @ApiProperty({ example: '12:30:00', description: 'End break hour' })
  end_break_hour: Date;

  @Expose()
  @ApiProperty({ example: 1, description: 'Worker id' })
  worker_id: number;
}
