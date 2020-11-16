import { Controller, Get, Param } from '@nestjs/common';
import { SecureResourceController } from '../../../../bootstrap/blueprints/SecureResourceController';
import { Resource } from './Resource';
import { Appointment } from '../../entities/Appointment.entity';
import { AppointmentById } from '../../pipes/AppointmentById';
import { ConferenceService } from '../../services/ConferenceService';

@Controller()
export class ShowConferenceData extends SecureResourceController {
  public static Resource = Resource;

  constructor(private conferenceService: ConferenceService) {
    super();
  }

  // todo: role-based protection, check users and appointment.startsAt
  @Get('/appointments/:id/conference')
  async serve(
    @Param(AppointmentById) appointment: Appointment,
  ): Promise<Resource> {
    const token = await this.conferenceService.createToken(appointment);

    return Resource.make(token, appointment.conferenceRoom);
  }
}
