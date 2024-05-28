import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ProcedureItemDto {
  @Expose()
  @ApiProperty({ example: 1, description: 'Id' })
  id: number;

  @Expose()
  @ApiProperty({ example: 'Procedure', description: 'Name' })
  name: string;

  @Expose()
  @ApiProperty({ example: 'Some description', description: 'Description' })
  descriptions: string;

  @Expose()
  @ApiProperty({ example: 20, description: 'Duration (min)' })
  duration: number;

  @Expose()
  @ApiProperty({ example: 400, description: 'Price (lei)' })
  price: number;
}
