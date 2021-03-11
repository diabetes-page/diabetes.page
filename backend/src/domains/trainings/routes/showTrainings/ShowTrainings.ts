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
import { Training } from '../../entities/Training.entity';
import { Resource } from './Resource';

@Controller()
export class ShowTrainings extends ResourceController {
  public static Resource = Resource;

  @UseGuards(Consultant)
  @HttpCode(HttpStatus.OK)
  @Get('/trainings')
  async serve(@RequestUser() user: User): Promise<Resource> {
    const consultant = await user.loadAsConsultant();
    const trainings = await Training.find({
      where: {
        creator: consultant,
      },
    });
    return Resource.make(trainings);
  }
}
