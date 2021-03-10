import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ResourceController } from '../../../../blueprints/controllers/ResourceController';
import { Consultant as ConsultantGuard } from '../../../../blueprints/guards/Consultant';
import { EntityById } from '../../../../blueprints/pipes/EntityById';
import { Consultant } from '../../../users/entities/Consultant.entity';
import { AppointmentsWithWorkingGroupsResource } from '../../resources/AppointmentsWithWorkingGroupsResource';
import { AppointmentsService } from '../../services/AppointmentsService';

@Controller()
export class IndexConsultantAppointments extends ResourceController {
  public static Resource = AppointmentsWithWorkingGroupsResource;

  constructor(private appointmentsService: AppointmentsService) {
    super();
  }

  @UseGuards(ConsultantGuard)
  @Get('/consultants/:consultantId/appointments')
  async serve(
    @Param(new EntityById(Consultant, 'consultantId')) consultant: Consultant,
  ): Promise<AppointmentsWithWorkingGroupsResource> {
    const appointments = await this.appointmentsService.forConsultant(
      consultant,
    );

    return AppointmentsWithWorkingGroupsResource.make(appointments);
  }
}
