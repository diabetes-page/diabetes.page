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

@Controller()
export class ShowTrainings extends ResourceController {
  @UseGuards(Consultant)
  @HttpCode(HttpStatus.OK)
  @Get('/trainings')
  async serve(@RequestUser() user: User): Promise<Training[]> {
    const consultant = user.loadAsConsultant();
    return await Training.find({
      where: {
        creator: consultant,
      },
    });
  }
}
