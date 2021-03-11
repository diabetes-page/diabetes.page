import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { parseISO } from 'date-fns';
import { ResourceController } from '../../../../blueprints/controllers/ResourceController';
import { RequestUser } from '../../../../blueprints/decorators/RequestUser';
import { Consultant } from '../../../../blueprints/guards/Consultant';
import { EntityById } from '../../../../blueprints/pipes/EntityById';
import { Training } from '../../../trainings/entities/Training.entity';
import { User } from '../../../users/entities/User.entity';
import { AppointmentsService } from '../../services/AppointmentsService';
import { Parameters } from './Parameters';
import { Resource } from './Resource';

@Controller()
export class CreateAppointment extends ResourceController {
  public static Resource = Resource;

  constructor(private appointmentsService: AppointmentsService) {
    super();
  }

  @UseGuards(Consultant)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/trainings/:trainingId/appointments')
  async serve(
    @Param(new EntityById(Training, 'trainingId')) training: Training,
    @RequestUser() user: User,
    @Body() params: Parameters,
  ): Promise<Resource> {
    await user.loadAsConsultant();
    await this.appointmentsService.add(
      training,
      user.asConsultant!,
      parseISO(params.startsAt),
      parseISO(params.endsAt),
    );

    return Resource.make();
  }
}
