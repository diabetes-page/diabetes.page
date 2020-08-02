import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/UsersService';
import { User } from '../../users/entities/User.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<User | undefined> {
    const user = await this.usersService.one({ where: { email: email } });

    if (user?.password === password) {
      return user;
    }
  }

  async login(user: User): Promise<string> {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
}
