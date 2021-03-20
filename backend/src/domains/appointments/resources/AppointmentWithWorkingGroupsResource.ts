import { Expose, Type } from 'class-transformer';
import { BasicWorkingGroupResource } from '../../workingGroups/resources/BasicWorkingGroupResource';
import { Appointment } from '../entities/Appointment.entity';
import { AppointmentResource } from './AppointmentResource';

export class AppointmentWithWorkingGroupsResource {
  @Expose()
  @Type(() => AppointmentResource)
  appointment: AppointmentResource;

  @Expose()
  @Type(() => BasicWorkingGroupResource)
  workingGroups: BasicWorkingGroupResource[];

  static make = async (
    appointment: Appointment,
  ): Promise<AppointmentWithWorkingGroupsResource> => {
    if (!appointment.workingGroups) {
      await appointment.loadWorkingGroups();
    }

    return {
      appointment: await AppointmentResource.make(appointment),
      workingGroups: appointment.workingGroups.map((group) =>
        BasicWorkingGroupResource.make(group),
      ),
    };
  };
}
