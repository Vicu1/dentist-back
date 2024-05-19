import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class WorkerItemDto {
  @Expose()
  @ApiProperty({ example: 1, description: 'Id' })
  id: number;

  @Expose()
  @ApiProperty({ example: 'Constantin', description: 'First name' })
  first_name: string;

  @Expose()
  @ApiProperty({ example: 'Frunza', description: 'Last name' })
  last_name: string;
}
