import { Body, Controller, Post } from '@nestjs/common';
import { Parameters } from './Parameters';
import { AuthService } from '../../services/AuthService';
import { AuthenticationPipe } from './AuthenticationPipe';
import { User } from '../../../users/entities/User.entity';

@Controller()
export class Login {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(
    @Body() params: Parameters,
    @Body(AuthenticationPipe) authenticatedUser: User,
  ): Promise<string> {
    return this.authService.login(authenticatedUser);
  }
}
