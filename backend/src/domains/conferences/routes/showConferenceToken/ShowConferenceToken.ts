import { Controller, Get, Param } from '@nestjs/common';
import { ResourceController } from '../../../../blueprints/controllers/ResourceController';
import { RequestUser } from '../../../../blueprints/decorators/RequestUser';
import { EntityById } from '../../../../blueprints/pipes/EntityById';
import { Appointment } from '../../../appointments/entities/Appointment.entity';
import { User } from '../../../users/entities/User.entity';
import { ConferencesService } from '../../services/ConferencesService';
import { Resource } from './Resource';

@Controller()
export class ShowConferenceToken extends ResourceController {
  public static Resource = Resource;

  constructor(private conferenceService: ConferencesService) {
    super();
  }

  // todo: check if user is assigned (or consultant), check appointment.startsAt / endsAt
  @Get('/appointments/:appointmentId/conference/token')
  async serve(
    @Param(new EntityById(Appointment, 'appointmentId'))
    appointment: Appointment,
    @RequestUser() user: User,
  ): Promise<Resource> {
    const conferenceToken = await this.conferenceService.createToken(
      appointment,
      user,
    );

    return Resource.make(conferenceToken);
  }
}
