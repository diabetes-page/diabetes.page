import { Expose, Type } from 'class-transformer';
import { mapPromises } from '../../../../utilities/promises';
import { Appointment } from '../../entities/Appointment.entity';
import { AppointmentWithWorkingGroupsResource } from '../../resources/AppointmentWithWorkingGroupsResource';

export class Resource {
  @Expose()
  @Type(() => AppointmentWithWorkingGroupsResource)
  appointments: AppointmentWithWorkingGroupsResource[];

  static make = async (appointments: Appointment[]): Promise<Resource> => {
    return {
      appointments: await mapPromises(
        appointments,
        async (appointment: Appointment) =>
          AppointmentWithWorkingGroupsResource.make(appointment),
      ),
    };
  };
}
