import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class OfficeItemDto {
  @Expose()
  @ApiProperty({ example: 1, description: 'Id' })
  id: number;

  @Expose()
  @ApiProperty({ example: 'Best office', description: 'Name' })
  name: string;

  @Expose()
  @ApiProperty({ example: 'Some description', description: 'Description' })
  descriptions: string;

  @Expose()
  @ApiProperty({ example: '098545344', description: 'Phone' })
  phone: number;

  @Expose()
  @ApiProperty({ example: 'str.Decebal', description: 'Address' })
  address: string;
}
