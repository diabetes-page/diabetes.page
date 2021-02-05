import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ResourceController } from '../../../../blueprints/controllers/ResourceController';
import { ConsultantGuard } from '../../../../blueprints/guards/ConsultantGuard';
import { UsersService } from '../../services/UsersService';
import { Parameters } from './Parameters';
import { Resource } from './Resource';

@Controller()
export class IndexUsers extends ResourceController {
  public static Resource = Resource;

  constructor(private usersService: UsersService) {
    super();
  }

  @UseGuards(ConsultantGuard)
  @Get('/users')
  async serve(@Query() params: Parameters): Promise<Resource> {
    const users = await this.usersService.all();

    return Resource.make(users);
  }
}
