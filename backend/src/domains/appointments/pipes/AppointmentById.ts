import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { AppointmentsService } from '../services/AppointmentsService';
import { Appointment } from '../entities/Appointment.entity';

@Injectable()
export class AppointmentById implements PipeTransform {
  constructor(private appointmentsService: AppointmentsService) {}

  async transform(routeParams: Record<string, string>): Promise<Appointment> {
    const id = parseInt(routeParams.id);
    const appointment = await this.appointmentsService.get(id);

    if (!appointment) {
      throw new NotFoundException();
    }

    return appointment;
  }
}
