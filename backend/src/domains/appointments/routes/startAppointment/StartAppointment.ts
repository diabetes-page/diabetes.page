import {
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ResourceController } from '../../../../blueprints/controllers/ResourceController';
import { EntityById } from '../../../../blueprints/pipes/EntityById';
import { Appointment } from '../../entities/Appointment.entity';
import { AppointmentsService } from '../../services/AppointmentsService';
import { AppointmentPresenterGuard } from './AppointmentPresenterGuard';
import { Resource } from './Resource';

@Controller()
export class StartAppointment extends ResourceController {
  public static Resource = Resource;

  constructor(private appointmentsService: AppointmentsService) {
    super();
  }

  @UseGuards(new AppointmentPresenterGuard('appointmentId'))
  @Post('appointments/:appointmentId/start')
  @HttpCode(HttpStatus.NO_CONTENT)
  async serve(
    @Param(new EntityById(Appointment, 'appointmentId'))
    appointment: Appointment,
  ): Promise<Record<never, never>> {
    await this.appointmentsService.start(appointment);

    return Resource.make();
  }
}
