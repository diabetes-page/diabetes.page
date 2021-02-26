import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ResourceController } from '../../../../blueprints/controllers/ResourceController';
import { EntityById } from '../../../../blueprints/pipes/EntityById';
import { Appointment } from '../../../appointments/entities/Appointment.entity';
import { FullTrainingResource } from '../../resources/FullTrainingResource';

@Controller()
export class ShowTraining extends ResourceController {
  public static Resource = FullTrainingResource;

  // todo: authorization
  @Get('/appointments/:appointmentId/training')
  async serve(
    @Param(new EntityById(Appointment, 'appointmentId'))
    appointment: Appointment,
  ): Promise<FullTrainingResource> {
    const training = await appointment.loadTraining();

    // Todo: get the Training directly through a pipe
    if (!training) {
      throw new NotFoundException();
    }

    return FullTrainingResource.make(training);
  }
}
