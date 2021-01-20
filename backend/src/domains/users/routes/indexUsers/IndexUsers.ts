import { Controller, Get, Query } from '@nestjs/common';
import { ResourceController } from '../../../../blueprints/controllers/ResourceController';
import { UsersService } from '../../services/UsersService';
import { Parameters } from './Parameters';
import { Resource } from './Resource';

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
