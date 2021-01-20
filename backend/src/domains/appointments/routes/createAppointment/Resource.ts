import { Appointment } from '../../entities/Appointment.entity';
import { AppointmentResource } from '../../resources/AppointmentResource';

export class Resource extends AppointmentResource {
  static make = (appointment: Appointment): Resource => {
    return appointment;
  };
}
