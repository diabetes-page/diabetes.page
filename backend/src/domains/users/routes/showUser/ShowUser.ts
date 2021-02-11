import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ResourceController } from '../../../../blueprints/controllers/ResourceController';
import { ConsultantOrTargetsSelfGuard } from '../../../../blueprints/guards/ConsultantOrTargetsSelfGuard';
import { EntityById } from '../../../../blueprints/pipes/EntityById';
import { User } from '../../entities/User.entity';
import { SensitiveDataUserResource } from '../../resources/SensitiveDataUserResource';

@Controller()
export class ShowUser extends ResourceController {
  public static Resource = SensitiveDataUserResource;

  @UseGuards(new ConsultantOrTargetsSelfGuard('id'))
  @Get('/users/:id')
  async serve(
    @Param(new EntityById(User))
    user: User,
  ): Promise<SensitiveDataUserResource> {
    return SensitiveDataUserResource.make(user);
  }
}
