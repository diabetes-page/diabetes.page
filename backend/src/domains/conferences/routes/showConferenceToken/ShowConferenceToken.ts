import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ResourceController } from '../../../../blueprints/controllers/ResourceController';
import { RequestUser } from '../../../../blueprints/decorators/RequestUser';
import { ConsultantOrAppointmentParticipant } from '../../../../blueprints/guards/ConsultantOrAppointmentParticipant';
import { Appointment } from '../../../appointments/entities/Appointment.entity';
import { User } from '../../../users/entities/User.entity';
import { ConferencesService } from '../../services/ConferencesService';
import { Resource } from './Resource';
import { RunningAppointmentById } from './RunningAppointmentById';

@Controller()
export class ShowConferenceToken extends ResourceController {
  public static Resource = Resource;

  constructor(private conferenceService: ConferencesService) {
    super();
  }

  @UseGuards(
    new ConsultantOrAppointmentParticipant('workingGroupId', 'appointmentId'),
  )
  @Get(
    '/working-groups/:workingGroupId/appointments/:appointmentId/conference/token',
  )
  async serve(
    @Param(new RunningAppointmentById('appointmentId'))
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
