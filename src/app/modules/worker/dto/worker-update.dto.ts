import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayUnique, IsInt, Length } from 'class-validator';

@Exclude()
export class WorkerUpdateDto {
  @Expose()
  @ApiProperty({ example: 1, description: 'Office id' })
  office_id: number;

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

  @Expose()
  @ApiProperty({ example: [1, 2], description: 'Procedures', isArray: true })
  @ArrayUnique()
  procedures: number[];
}
