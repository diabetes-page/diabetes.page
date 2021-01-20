import {
  Injectable,
  PipeTransform,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../../../users/entities/User.entity';
import { AuthService } from '../../services/AuthService';
import { Parameters } from './Parameters';

@Injectable()
export class AuthenticationPipe implements PipeTransform {
  constructor(private authService: AuthService) {}

  async transform(params: Parameters): Promise<User> {
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
