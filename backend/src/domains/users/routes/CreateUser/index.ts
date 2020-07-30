import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Parameters } from './Parameters';
import { UsersService } from '../../services/UsersService';
import { User } from '../../models/User.entity';

@Controller()
export class CreateUser {
  constructor(private usersService: UsersService) {}

  @HttpCode(201)
  @Post('/users')
  async serve(@Body() params: Parameters): Promise<User> {
    return this.usersService.create(params.firstName, params.lastName);
  }
}
