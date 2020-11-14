import { Appointment } from '../../entities/Appointment.entity';

export class Resource extends Appointment {
  static make = (appointment: Appointment): Resource => {
    return appointment;
  };
}
