import { Controller, Get, Query } from '@nestjs/common';
import { Parameters } from './Parameters';
import { UsersService } from '../../services/UsersService';
import { Resource } from './Resource';
import { ResourceController } from '../../../../blueprints/controllers/ResourceController';

@Controller()
export class IndexUsers extends ResourceController {
  public static Resource = Resource;

  constructor(private usersService: UsersService) {
    super();
  }

  // todo: role-based protection
  @Get('/users')
  async serve(@Query() params: Parameters): Promise<Resource> {
    const users = await this.usersService.all();

    return Resource.make(users);
  }
}
