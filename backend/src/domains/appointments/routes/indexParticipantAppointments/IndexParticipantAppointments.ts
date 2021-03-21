import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ResourceController } from '../../../../blueprints/controllers/ResourceController';
import { ConsultantOrTargetsSelf } from '../../../../blueprints/guards/ConsultantOrTargetsSelf';
import { EntityById } from '../../../../blueprints/pipes/EntityById';
import { User } from '../../../users/entities/User.entity';
import { AppointmentsWithWorkingGroupsResource } from '../../resources/AppointmentsWithWorkingGroupsResource';
import { AppointmentsService } from '../../services/AppointmentsService';

@Controller()
export class IndexParticipantAppointments extends ResourceController {
  public static Resource = AppointmentsWithWorkingGroupsResource;

  constructor(private appointmentsService: AppointmentsService) {
    super();
  }

  @UseGuards(new ConsultantOrTargetsSelf('userId'))
  @Get('/users/:userId/appointments')
  async serve(
    @Param(new EntityById(User, 'userId')) user: User,
  ): Promise<AppointmentsWithWorkingGroupsResource> {
    const appointments = await this.appointmentsService.forParticipant(user);

    return AppointmentsWithWorkingGroupsResource.make(appointments);
  }
}
