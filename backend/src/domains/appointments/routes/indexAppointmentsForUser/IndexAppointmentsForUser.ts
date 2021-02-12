import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ResourceController } from '../../../../blueprints/controllers/ResourceController';
import { ConsultantOrTargetsSelf } from '../../../../blueprints/guards/ConsultantOrTargetsSelf';
import { EntityById } from '../../../../blueprints/pipes/EntityById';
import { User } from '../../../users/entities/User.entity';
import { AppointmentsService } from '../../services/AppointmentsService';
import { Resource } from './Resource';

@Controller()
export class IndexAppointmentsForUser extends ResourceController {
  public static Resource = Resource;

  constructor(private appointmentsService: AppointmentsService) {
    super();
  }

  @UseGuards(new ConsultantOrTargetsSelf('id'))
  @Get('/users/:id/appointments')
  async serve(
    @Param(new EntityById(User, 'id')) user: User,
  ): Promise<Resource> {
    const appointments = await this.appointmentsService.forUser(user);

    return Resource.make(appointments);
  }
}