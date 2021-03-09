import { Expose, Type } from 'class-transformer';
import { mapPromises } from '../../../../utilities/promises';
import { AppointmentInWorkingGroupResource } from '../../resources/AppointmentInWorkingGroupResource';
import { AppointmentInWorkingGroup } from '../../types/AppointmentInWorkingGroup';

export class Resource {
  @Expose()
  @Type(() => AppointmentInWorkingGroupResource)
  appointments: AppointmentInWorkingGroupResource[];

  static make = async (
    appointmentsInGroups: AppointmentInWorkingGroup[],
  ): Promise<Resource> => {
    return {
      appointments: await mapPromises(
        appointmentsInGroups,
        async (appointmentInGroup: AppointmentInWorkingGroup) =>
          AppointmentInWorkingGroupResource.make(appointmentInGroup),
      ),
    };
  };
}
