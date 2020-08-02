import { Controller, Get, Query } from '@nestjs/common';
import { Parameters } from './Parameters';
import { UsersService } from '../../services/UsersService';
import { User } from '../../entities/User.entity';

@Controller()
export class GetUsers {
  constructor(private usersService: UsersService) {}

  @Get('/users')
  async serve(@Query() params: Parameters): Promise<User[]> {
    const options = params.amount ? { take: params.amount } : {};
    return await this.usersService.all(options);
  }
}
