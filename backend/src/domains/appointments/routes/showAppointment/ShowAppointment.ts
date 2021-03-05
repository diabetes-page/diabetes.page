import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ResourceController } from '../../../../blueprints/controllers/ResourceController';
import { ConsultantOrAppointmentParticipant } from '../../../../blueprints/guards/ConsultantOrAppointmentParticipant';
import { EntityById } from '../../../../blueprints/pipes/EntityById';
import { Appointment } from '../../entities/Appointment.entity';
import { AppointmentResource } from '../../resources/AppointmentResource';

@Controller()
export class ShowAppointment extends ResourceController {
  public static Resource = AppointmentResource;

  @UseGuards(new ConsultantOrAppointmentParticipant('appointmentId'))
  @Get('appointments/:appointmentId')
  async serve(
    @Param(new EntityById(Appointment, 'appointmentId'))
    appointment: Appointment,
  ): Promise<AppointmentResource> {
    return AppointmentResource.make(appointment);
  }
}
