import { Expose, Type } from 'class-transformer';
import { mapPromises } from '../../../../utilities/promises';
import { Appointment } from '../../entities/Appointment.entity';
import { AppointmentResource } from '../../resources/AppointmentResource';

export class Resource {
  @Expose()
  @Type(() => AppointmentResource)
  appointments: AppointmentResource[];

  static make = async (appointments: Appointment[]): Promise<Resource> => {
    return {
      appointments: await mapPromises(
        appointments,
        async (appointment: Appointment) =>
          AppointmentResource.make(appointment),
      ),
    };
  };
}
