import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ResourceController } from '../../../../blueprints/controllers/ResourceController';
import { RequestUser } from '../../../../blueprints/decorators/RequestUser';
import { Consultant } from '../../../../blueprints/guards/Consultant';
import { User } from '../../../users/entities/User.entity';
import { WorkingGroupsService } from '../../services/WorkingGroupsService';
import { Resource } from './Resource';

@Controller()
export class IndexWorkingGroups extends ResourceController {
  public static Resource = Resource;

  constructor(private workingGroupsService: WorkingGroupsService) {
    super();
  }

  @UseGuards(Consultant)
  @HttpCode(HttpStatus.OK)
  @Get('/working-groups')
  async serve(@RequestUser() user: User): Promise<Resource> {
    const consultant = await user.loadAsConsultant();

    return Resource.make(
      await this.workingGroupsService.getWorkingGroupsForConsultant(
        consultant!,
      ),
    );
  }
}
