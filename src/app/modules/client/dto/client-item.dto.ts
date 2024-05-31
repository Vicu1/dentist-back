import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ClientItemDto {
  @Expose()
  @ApiProperty({ example: 1, description: 'Id' })
  id: number;

  @Expose()
  @ApiProperty({ example: 'Constantin', description: 'Name' })
  name: string;

  @Expose()
  @ApiProperty({ example: 75845343, description: 'Phone' })
  phone: number;

  @Expose()
  @ApiProperty({ example: false, description: 'Is blocked' })
  is_blocked: boolean;
}
