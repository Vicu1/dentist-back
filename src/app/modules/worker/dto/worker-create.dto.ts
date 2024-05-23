import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Length } from 'class-validator';

@Exclude()
export class WorkerCreateDto {
  @Expose()
  @ApiProperty({ example: 1, description: 'Office id' })
  officeId: number;

  @Expose()
  @ApiProperty({ example: 'Constantin', description: 'First name' })
  @Length(2, 50)
  first_name: string;

  @Expose()
  @ApiProperty({ example: 'Frunza', description: 'Last name' })
  @Length(2, 50)
  last_name: string;

  @Expose()
  @ApiProperty({ example: 2014, description: 'Start work year' })
  @IsInt()
  start_work_year: number;
}
