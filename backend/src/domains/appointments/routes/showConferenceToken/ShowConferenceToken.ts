import { Controller, Get, Param } from '@nestjs/common';
import { SecureResourceController } from '../../../../bootstrap/blueprints/SecureResourceController';
import { Resource } from './Resource';
import { Appointment } from '../../entities/Appointment.entity';
import { AppointmentById } from '../../pipes/AppointmentById';
import { ConferenceService } from '../../services/ConferenceService';

@Controller()
export class ShowConferenceToken extends SecureResourceController {
  public static Resource = Resource;

  constructor(private conferenceService: ConferenceService) {
    super();
  }

  // todo: role-based protection, check users and appointment.startsAt
  @Get('/appointments/:id/conference-token')
  async serve(
    @Param(AppointmentById) appointment: Appointment,
  ): Promise<Resource> {
    return Resource.make(await this.conferenceService.createToken(appointment));
  }
}
