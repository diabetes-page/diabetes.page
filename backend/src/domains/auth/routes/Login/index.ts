import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class Login {
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(): Promise<void> {
    return void 0;
  }
}
