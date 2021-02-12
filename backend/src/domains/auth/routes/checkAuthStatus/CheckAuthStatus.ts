import { Controller, Get } from '@nestjs/common';
import { ResourceController } from '../../../../blueprints/controllers/ResourceController';
import { RequestUser } from '../../../../blueprints/decorators/RequestUser';
import { User } from '../../../users/entities/User.entity';
import { Resource } from './Resource';

@Controller()
export class CheckAuthStatus extends ResourceController {
  public static Resource = Resource;

  @Get('/auth/status')
  async serve(@RequestUser() user: User): Promise<Resource> {
    return Resource.make(user);
  }
}
