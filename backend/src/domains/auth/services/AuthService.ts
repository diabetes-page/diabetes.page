import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/UsersService';
import { User } from '../../users/entities/User.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<User | undefined> {
    const user = await this.usersService.one({ where: { email: email } });

    if (user?.password === password) {
      return user;
    }
  }
}
