import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';

@Exclude()
export class AuthLoginDto {
  @Expose()
  @ApiProperty({ example: 'root@domain.com', description: 'Email' })
  @Length(2, 50)
  @IsEmail()
  email: string;

  @Expose()
  @ApiProperty({ example: '123456789', description: 'Password' })
  @Length(2, 100)
  password: string;
}
