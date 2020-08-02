import { Body, Controller, Post } from '@nestjs/common';
import { Parameters } from './Parameters';
import { LocalStrategy } from '../../strategies/LocalStrategy';
import { AuthService } from '../../services/AuthService';

@Controller()
export class Login {
  constructor(
    private localStrategy: LocalStrategy,
    private authService: AuthService,
  ) {}

  @Post('/login')
  async login(@Body() params: Parameters): Promise<string> {
    const user = await this.localStrategy.validate(
      params.email,
      params.password,
    );
    return this.authService.login(user);
  }
}
