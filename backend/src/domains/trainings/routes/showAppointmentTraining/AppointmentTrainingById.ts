import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { EntityById } from '../../../../blueprints/pipes/EntityById';
import { Appointment } from '../../../appointments/entities/Appointment.entity';
import { Training } from '../../entities/Training.entity';

@Injectable()
export class AppointmentTrainingById implements PipeTransform {
  constructor(protected appointmentIdParam: string) {}

  async transform(routeParams: Record<string, string>): Promise<Training> {
    const appointment = (await new EntityById(
      Appointment,
      this.appointmentIdParam,
    ).transform(routeParams)) as Appointment;
    const training = await appointment.loadTraining();

    if (!training) {
      throw new NotFoundException();
    }

    return training;
  }
}
