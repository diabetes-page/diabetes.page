import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ResourceController } from '../../../../blueprints/controllers/ResourceController';
import { RequestUser } from '../../../../blueprints/decorators/RequestUser';
import { Consultant } from '../../../../blueprints/guards/Consultant';
import { User } from '../../../users/entities/User.entity';
import { AppointmentsService } from '../../services/AppointmentsService';
import {
  CreateAppointmentData,
  CreateAppointmentPipe,
} from './CreateAppointmentPipe';
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
  @Post('/appointments')
  async serve(
    @RequestUser() user: User,
    @Body() params: Parameters,
    @Body(CreateAppointmentPipe) data: CreateAppointmentData,
  ): Promise<Resource> {
    await user.loadAsConsultant();
    await this.appointmentsService.add(
      user.asConsultant!,
      data.startsAt,
      data.endsAt,
      [data.workingGroup],
      data.training,
    );

    return Resource.make();
  }
}
