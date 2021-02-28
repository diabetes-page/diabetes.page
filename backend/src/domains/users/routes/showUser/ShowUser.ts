import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ResourceController } from '../../../../blueprints/controllers/ResourceController';
import { ConsultantOrTargetsSelf } from '../../../../blueprints/guards/ConsultantOrTargetsSelf';
import { EntityById } from '../../../../blueprints/pipes/EntityById';
import { User } from '../../entities/User.entity';
import { SensitiveDataUserResource } from '../../resources/SensitiveDataUserResource';

@Controller()
export class ShowUser extends ResourceController {
  public static Resource = SensitiveDataUserResource;

  @UseGuards(new ConsultantOrTargetsSelf('userId'))
  @Get('/users/:userId')
  async serve(
    @Param(new EntityById(User, 'userId'))
    user: User,
  ): Promise<SensitiveDataUserResource> {
    return SensitiveDataUserResource.make(user);
  }
}
