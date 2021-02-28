import { Controller, Get, Param } from '@nestjs/common';
import { ResourceController } from '../../../../blueprints/controllers/ResourceController';
import { EntityById } from '../../../../blueprints/pipes/EntityById';
import { Appointment } from '../../entities/Appointment.entity';
import { AppointmentResource } from '../../resources/AppointmentResource';

@Controller()
export class ShowAppointment extends ResourceController {
  public static Resource = AppointmentResource;

  // todo: authorization
  @Get('/appointments/:appointmentId')
  async serve(
    @Param(new EntityById(Appointment, 'appointmentId'))
    appointment: Appointment,
  ): Promise<AppointmentResource> {
    return AppointmentResource.make(appointment);
  }
}
