import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ClientCreateDto {
  @Expose()
  @ApiProperty({ example: 'Constantin', description: 'Name' })
  name: string;

  @Expose()
  @ApiProperty({ example: 75845343, description: 'Phone' })
  phone: number;
}
