import { Controller, Get } from '@nestjs/common';
import { ResourceController } from '../../../../blueprints/controllers/ResourceController';
import { RequestUser } from '../../../../blueprints/decorators/RequestUser';
import { User } from '../../entities/User.entity';
import { SensitiveDataUserResource } from '../../resources/SensitiveDataUserResource';

@Controller()
export class ShowOwnUser extends ResourceController {
  public static Resource = SensitiveDataUserResource;

  // todo: change this route to showUser and specify id
  @Get('/me')
  async serve(@RequestUser() user: User): Promise<SensitiveDataUserResource> {
    return SensitiveDataUserResource.make(user);
  }
}
