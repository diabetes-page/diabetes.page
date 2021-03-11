import { Expose, Type } from 'class-transformer';
import { BasicWorkingGroupResource } from '../../workingGroups/resources/BasicWorkingGroupResource';
import { AppointmentInWorkingGroup } from '../types/AppointmentInWorkingGroup';
import { AppointmentResource } from './AppointmentResource';

export class AppointmentInWorkingGroupResource {
  @Expose()
  @Type(() => AppointmentResource)
  appointment: AppointmentResource;

  @Expose()
  @Type(() => BasicWorkingGroupResource)
  workingGroup: BasicWorkingGroupResource;

  static make = async ({
    appointment,
    workingGroup,
  }: AppointmentInWorkingGroup): Promise<AppointmentInWorkingGroupResource> => {
    return {
      appointment: await AppointmentResource.make(appointment),
      workingGroup: await BasicWorkingGroupResource.make(workingGroup),
    };
  };
}
