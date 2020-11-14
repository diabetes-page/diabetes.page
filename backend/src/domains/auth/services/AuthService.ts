import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/UsersService';
import { User } from '../../users/entities/User.entity';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

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
    const user = await this.usersService.oneWhere({ email });
    const match = user && (await compare(password, user.password));

    if (match) {
      return user;
    }
  }

  async login(user: User): Promise<string> {
    const payload = { sub: user.id };
    return this.jwtService.sign(payload);
  }
}
