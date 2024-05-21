import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

@Exclude()
export class OfficeCreateDto {
  @Expose()
  @ApiProperty({ example: 'Best office', description: 'Name' })
  @Length(2, 50)
  name: string;

  @Expose()
  @ApiProperty({ example: 'Some description', description: 'Description' })
  @Length(25, 1000)
  descriptions: string;

  @Expose()
  @ApiProperty({ example: '069432432', description: 'Phone' })
  phone: number;

  @Expose()
  @ApiProperty({ example: 'str.Decebal 32', description: 'Address' })
  address: string;
}
