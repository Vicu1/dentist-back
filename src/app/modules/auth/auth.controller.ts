import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from '@/app/modules/auth/auth.service';
import { Response } from 'express';
import { AuthLoginDto } from '@/app/modules/auth/dto/auth-login.dto';

@ApiTags('Auth')
@Controller('/admin/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Login' })
  @ApiOkResponse({
    description: 'Login',
  })
  async login(@Body() authLoginDto: AuthLoginDto, @Res() response: Response) {
    return response
      .status(HttpStatus.OK)
      .send(await this.authService.login(authLoginDto));
  }
}
