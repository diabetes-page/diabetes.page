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
import { AppointmentWithWorkingGroupsResource } from '../../resources/AppointmentWithWorkingGroupsResource';
import { AppointmentsService } from '../../services/AppointmentsService';
import { CreateAppointmentPreprocessor } from './CreateAppointmentPreprocessor';
import { Parameters } from './Parameters';

@Controller()
export class CreateAppointment extends ResourceController {
  public static Resource = AppointmentWithWorkingGroupsResource;

  constructor(
    private appointmentsService: AppointmentsService,
    private preprocessor: CreateAppointmentPreprocessor,
  ) {
    super();
  }

  @UseGuards(Consultant)
  @HttpCode(HttpStatus.OK)
  @Post('/appointments')
  async serve(
    @RequestUser() user: User,
    @Body() params: Parameters,
  ): Promise<AppointmentWithWorkingGroupsResource> {
    const {
      startsAt,
      endsAt,
      training,
      workingGroup,
    } = await this.preprocessor.process(params);

    const appointment = await this.appointmentsService.add(
      user.asConsultant!,
      startsAt,
      endsAt,
      [workingGroup],
      training,
    );

    return AppointmentWithWorkingGroupsResource.make(appointment);
  }
}
