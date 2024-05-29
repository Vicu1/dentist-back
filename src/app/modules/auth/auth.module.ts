import { Module } from '@nestjs/common';
import { AuthController } from '@/app/modules/auth/auth.controller';
import { AuthService } from '@/app/modules/auth/auth.service';
import { UserModule } from '@/app/modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UserModule, JwtModule],
})
export class AuthModule {}
