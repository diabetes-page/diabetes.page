import { Controller, Get, Query } from '@nestjs/common';
import { Parameters } from './Parameters';
import { UsersService } from '../../services/UsersService';
import { Resource } from './Resource';
import { SecureResourceController } from '../../../../bootstrap/blueprints/SecureResourceController';

@Controller()
export class IndexUsers extends SecureResourceController {
  public static Resource = Resource;

  constructor(private usersService: UsersService) {
    super();
  }

  @Get('/users')
  async serve(@Query() params: Parameters): Promise<Resource> {
    const options = params.amount ? { take: params.amount } : {};
    const users = await this.usersService.all(options);

    return Resource.make(users);
  }
}
