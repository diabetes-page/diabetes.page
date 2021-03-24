import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../../../users/entities/User.entity';
import { AuthService } from '../../services/AuthService';
import { Parameters } from './Parameters';

@Injectable()
export class LoginPreprocessor {
  constructor(private authService: AuthService) {}

  async process(params: Parameters): Promise<User> {
    const user = await this.authService.validateUser(
      params.email,
      params.password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
