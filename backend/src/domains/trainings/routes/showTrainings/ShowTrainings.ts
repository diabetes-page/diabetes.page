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
import { TrainingsService } from '../../services/TrainingsService';
import { Resource } from './Resource';

@Controller()
export class ShowTrainings extends ResourceController {
  public static Resource = Resource;

  constructor(private trainingsService: TrainingsService) {
    super();
  }

  @UseGuards(Consultant)
  @HttpCode(HttpStatus.OK)
  @Get('/trainings')
  async serve(@RequestUser() user: User): Promise<Resource> {
    const consultant = await user.loadAsConsultant();
    return Resource.make(
      await this.trainingsService.getTrainingsForConsultant(consultant!),
    );
  }
}
