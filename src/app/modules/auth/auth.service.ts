import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthLoginDto } from '@/app/modules/auth/dto/auth-login.dto';
import { UserService } from '@/app/modules/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import ConfigEnv from '@/config/config.env';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(authLoginDto: AuthLoginDto) {
    const user = await this.userService.findByEmail(authLoginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user && (await bcrypt.compare(authLoginDto.password, user.password))) {
      return {
        token: this.jwtService.sign(
          {
            email: user.email,
          },
          {
            secret: ConfigEnv.JWT_SECRET,
            expiresIn: ConfigEnv.TOKEN_EXPIRES_IN,
            algorithm: 'RS256',
          },
        ),
      };
    }

    throw new UnauthorizedException('Invalid credentials');
  }
}
