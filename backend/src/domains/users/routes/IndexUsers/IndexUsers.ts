import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Parameters } from './Parameters';
import { UsersService } from '../../services/UsersService';
import { Resource } from './Resource';
import { ResourceController } from '../../../../bootstrap/blueprints/ResourceController';
import { JWTAuthGuard } from '../../../auth/guards/JWTAuthGuard';

@Controller()
export class IndexUsers extends ResourceController {
  public static Resource = Resource;

  constructor(private usersService: UsersService) {
    super();
  }

  @Get('/users')
  @UseGuards(JWTAuthGuard)
  async serve(@Query() params: Parameters): Promise<Resource> {
    const options = params.amount ? { take: params.amount } : {};
    const users = await this.usersService.all(options);

    return Resource.make(users);
  }
}
