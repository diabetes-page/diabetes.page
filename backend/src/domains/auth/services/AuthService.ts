import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from '../../users/entities/User.entity';
import { UsersService } from '../../users/services/UsersService';

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

    // Todo: check if last login has expired
    if (match) {
      return user;
    }
  }

  async login(user: User): Promise<string> {
    const payload = { sub: user.id };
    return this.jwtService.sign(payload);
  }
}
