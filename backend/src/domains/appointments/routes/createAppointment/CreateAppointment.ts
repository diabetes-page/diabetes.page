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
import { AppointmentResource } from '../../resources/AppointmentResource';
import { AppointmentsService } from '../../services/AppointmentsService';
import {
  CreateAppointmentData,
  CreateAppointmentPipe,
} from './CreateAppointmentPipe';
import { Parameters } from './Parameters';

@Controller()
export class CreateAppointment extends ResourceController {
  public static Resource = AppointmentResource;

  constructor(private appointmentsService: AppointmentsService) {
    super();
  }

  @UseGuards(Consultant)
  @HttpCode(HttpStatus.OK)
  @Post('/appointments')
  async serve(
    @RequestUser() user: User,
    @Body() params: Parameters,
    @Body(CreateAppointmentPipe) data: CreateAppointmentData,
  ): Promise<AppointmentResource> {
    await user.loadAsConsultant();
    const appointment = await this.appointmentsService.add(
      user.asConsultant!,
      data.startsAt,
      data.endsAt,
      [data.workingGroup],
      data.training,
    );

    return AppointmentResource.make(appointment);
  }
}
