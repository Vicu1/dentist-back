import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/app/modules/user/user.entity';
import { UserService } from '@/app/modules/user/user.service';
import { UserRepository } from '@/app/modules/user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
