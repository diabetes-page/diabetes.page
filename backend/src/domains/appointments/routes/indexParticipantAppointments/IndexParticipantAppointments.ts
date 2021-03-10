import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ResourceController } from '../../../../blueprints/controllers/ResourceController';
import { ConsultantOrTargetsSelf } from '../../../../blueprints/guards/ConsultantOrTargetsSelf';
import { EntityById } from '../../../../blueprints/pipes/EntityById';
import { User } from '../../../users/entities/User.entity';
import { AppointmentsService } from '../../services/AppointmentsService';
import { Resource } from './Resource';

@Controller()
export class IndexParticipantAppointments extends ResourceController {
  public static Resource = Resource;

  constructor(private appointmentsService: AppointmentsService) {
    super();
  }

  @UseGuards(new ConsultantOrTargetsSelf('userId'))
  @Get('/users/:userId/appointments')
  async serve(
    @Param(new EntityById(User, 'userId')) user: User,
  ): Promise<Resource> {
    const appointmentsInGroups = await this.appointmentsService.forUser(user);

    return Resource.make(appointmentsInGroups);
  }
}
