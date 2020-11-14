import { Controller, Get, Param } from '@nestjs/common';
import { SecureResourceController } from '../../../../bootstrap/blueprints/SecureResourceController';
import { Resource } from './Resource';
import { Appointment } from '../../entities/Appointment.entity';
import { AppointmentById } from '../../pipes/AppointmentById';

@Controller()
export class ShowConferenceToken extends SecureResourceController {
  public static Resource = Resource;

  // todo: role-based protection
  @Get('/appointments/:id/conference-token')
  async serve(
    @Param(AppointmentById) appointment: Appointment,
  ): Promise<Resource> {
    return { conferenceToken: appointment.conferenceRoom };
  }
}
