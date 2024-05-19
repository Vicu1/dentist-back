import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

@Exclude()
export class WorkerCreateDto {
  @Expose()
  @ApiProperty({ example: 'Constantin', description: 'First name' })
  @Length(2, 50)
  first_name: string;

  @Expose()
  @ApiProperty({ example: 'Frunza', description: 'Last name' })
  @Length(2, 50)
  last_name: string;
}
