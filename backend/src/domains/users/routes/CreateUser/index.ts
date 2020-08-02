import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import { Parameters } from './Parameters';
import { UsersService } from '../../services/UsersService';
import { User } from '../../entities/User.entity';

@Controller()
export class CreateUser {
  constructor(private usersService: UsersService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/users')
  async serve(@Body() params: Parameters): Promise<User> {
    return this.usersService.create(params.email);
  }
}
