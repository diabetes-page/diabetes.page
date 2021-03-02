import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ResourceController } from '../../../../blueprints/controllers/ResourceController';
import { ConsultantOrAppointmentParticipant } from '../../../../blueprints/guards/ConsultantOrAppointmentParticipant';
import { Training } from '../../entities/Training.entity';
import { FullTrainingResource } from '../../resources/FullTrainingResource';
import { AppointmentTrainingById } from './AppointmentTrainingById';

@Controller()
export class ShowAppointmentTraining extends ResourceController {
  public static Resource = FullTrainingResource;

  @UseGuards(
    new ConsultantOrAppointmentParticipant('workingGroupId', 'appointmentId'),
  )
  @Get('/working-groups/:workingGroupId/appointments/:appointmentId/training')
  async serve(
    @Param(new AppointmentTrainingById('appointmentId'))
    training: Training,
  ): Promise<FullTrainingResource> {
    return FullTrainingResource.make(training);
  }
}
