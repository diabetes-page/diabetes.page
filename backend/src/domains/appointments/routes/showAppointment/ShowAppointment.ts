import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ResourceController } from '../../../../blueprints/controllers/ResourceController';
import { EntityById } from '../../../../blueprints/pipes/EntityById';
import { Appointment } from '../../entities/Appointment.entity';
import { ConsultantOrAppointmentParticipant } from '../../guards/ConsultantOrAppointmentParticipant';
import { AppointmentResource } from '../../resources/AppointmentResource';

@Controller()
export class ShowAppointment extends ResourceController {
  public static Resource = AppointmentResource;

  @UseGuards(
    new ConsultantOrAppointmentParticipant('workingGroupId', 'appointmentId'),
  )
  @Get('/working-groups/:workingGroupId/appointments/:appointmentId')
  async serve(
    @Param(new EntityById(Appointment, 'appointmentId'))
    appointment: Appointment,
  ): Promise<AppointmentResource> {
    return AppointmentResource.make(appointment);
  }
}
