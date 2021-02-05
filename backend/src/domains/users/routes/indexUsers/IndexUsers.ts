import { Controller, Get, UseGuards } from '@nestjs/common';
import { ResourceController } from '../../../../blueprints/controllers/ResourceController';
import { ConsultantGuard } from '../../../../blueprints/guards/ConsultantGuard';
import { UsersService } from '../../services/UsersService';
import { Resource } from './Resource';

@Controller()
export class IndexUsers extends ResourceController {
  public static Resource = Resource;

  constructor(private usersService: UsersService) {
    super();
  }

  @UseGuards(ConsultantGuard)
  @Get('/users')
  async serve(): Promise<Resource> {
    const users = await this.usersService.all();

    return Resource.make(users);
  }
}
