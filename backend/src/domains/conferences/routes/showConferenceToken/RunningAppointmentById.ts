import { ForbiddenException, Injectable, PipeTransform } from '@nestjs/common';
import { EntityById } from '../../../../blueprints/pipes/EntityById';
import { Appointment } from '../../../appointments/entities/Appointment.entity';

@Injectable()
export class RunningAppointmentById implements PipeTransform {
  constructor(protected param: string) {}

  async transform(routeParams: Record<string, string>): Promise<Appointment> {
    const appointment = (await new EntityById(
      Appointment,
      this.param,
    ).transform(routeParams)) as Appointment;

    if (!appointment.isRunning) {
      throw new ForbiddenException();
    }

    return appointment;
  }
}
