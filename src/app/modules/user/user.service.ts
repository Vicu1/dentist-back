import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/app/modules/user/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }
}
