import { Expose, Type } from 'class-transformer';
import { mapPromises } from '../../../utilities/promises';
import { Appointment } from '../entities/Appointment.entity';
import { AppointmentWithWorkingGroupsResource } from './AppointmentWithWorkingGroupsResource';

export class AppointmentsWithWorkingGroupsResource {
  @Expose()
  @Type(() => AppointmentWithWorkingGroupsResource)
  appointments: AppointmentWithWorkingGroupsResource[];

  static make = async (
    appointments: Appointment[],
  ): Promise<AppointmentsWithWorkingGroupsResource> => {
    return {
      appointments: await mapPromises(
        appointments,
        async (appointment: Appointment) =>
          AppointmentWithWorkingGroupsResource.make(appointment),
      ),
    };
  };
}
