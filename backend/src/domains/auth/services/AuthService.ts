import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from '../../users/entities/User.entity';
import { UsersService } from '../../users/services/UsersService';
import { JWTPayload } from '../types/JWTPayload';

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

    if (!user || !user.password || user.verificationToken) {
      return;
    }
    const match = await compare(password, user.password);

    // Todo: check if last login has expired
    if (match) {
      return user;
    }
  }

  async login(user: User): Promise<string> {
    const payload: JWTPayload = { sub: user.id };
    return this.jwtService.sign(payload);
  }
}
