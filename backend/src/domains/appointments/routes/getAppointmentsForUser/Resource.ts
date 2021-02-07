import { Expose, Type } from 'class-transformer';
import { Appointment } from '../../entities/Appointment.entity';
import { AppointmentResource } from '../../resources/AppointmentResource';

export class Resource {
  @Expose()
  @Type(() => AppointmentResource)
  appointments: AppointmentResource[];

  static make = (appointments: Appointment[]): Resource => {
    return { appointments };
  };
}
