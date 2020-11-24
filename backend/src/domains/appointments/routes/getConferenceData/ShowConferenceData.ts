import { Controller, Get, Param } from '@nestjs/common';
import { ResourceController } from '../../../../blueprints/controllers/ResourceController';
import { Resource } from './Resource';
import { Appointment } from '../../entities/Appointment.entity';
import { AppointmentById } from '../../pipes/AppointmentById';
import { ConferenceService } from '../../services/ConferenceService';
import { RequestUser } from '../../../../blueprints/decorators/RequestUser';
import { User } from '../../../users/entities/User.entity';

@Controller()
export class ShowConferenceData extends ResourceController {
  public static Resource = Resource;

  constructor(private conferenceService: ConferenceService) {
    super();
  }

  // todo: role-based protection, check users and appointment.startsAt
  @Get('/appointments/:id/conference')
  async serve(
    @Param(AppointmentById) appointment: Appointment,
    @RequestUser() user: User,
  ): Promise<Resource> {
    const token = await this.conferenceService.createToken(appointment, user);

    return Resource.make(token, appointment.conferenceRoom);
  }
}
