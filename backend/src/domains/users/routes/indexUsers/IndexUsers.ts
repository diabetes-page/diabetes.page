import { Controller, Get, UseGuards } from '@nestjs/common';
import { ResourceController } from '../../../../blueprints/controllers/ResourceController';
import { Consultant } from '../../../../blueprints/guards/Consultant';
import { UsersService } from '../../services/UsersService';
import { Resource } from './Resource';

@Controller()
export class IndexUsers extends ResourceController {
  public static Resource = Resource;

  constructor(private usersService: UsersService) {
    super();
  }

  @UseGuards(Consultant)
  @Get('/users')
  async serve(): Promise<Resource> {
    const users = await this.usersService.all();

    return Resource.make(users);
  }
}
