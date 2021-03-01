import { Expose, Type } from 'class-transformer';
import { mapPromises } from '../../../../utilities/promises';
import { AppointmentResource } from '../../resources/AppointmentResource';
import { AppointmentInWorkingGroup } from '../../types/AppointmentInWorkingGroup';

export class Resource {
  @Expose()
  @Type(() => AppointmentResource)
  appointments: AppointmentResource[];

  static make = async (
    appointmentsInGroups: AppointmentInWorkingGroup[],
  ): Promise<Resource> => {
    return {
      appointments: await mapPromises(
        appointmentsInGroups,
        async (appointmentInGroup: AppointmentInWorkingGroup) =>
          AppointmentResource.make(appointmentInGroup),
      ),
    };
  };
}
