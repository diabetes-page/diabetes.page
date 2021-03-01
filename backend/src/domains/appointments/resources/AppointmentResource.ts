import { Expose, Type } from 'class-transformer';
import { BasicTrainingResource } from '../../trainings/resources/BasicTrainingResource';
import { BasicConsultantResource } from '../../users/resources/BasicConsultantResource';
import { BasicWorkingGroupResource } from '../../workingGroups/resources/BasicWorkingGroupResource';
import { AppointmentInWorkingGroup } from '../types/AppointmentInWorkingGroup';

export class AppointmentResource {
  @Expose()
  id: string;

  @Expose()
  @Type(() => BasicConsultantResource)
  presenter: BasicConsultantResource;

  @Expose()
  @Type(() => BasicTrainingResource)
  training: BasicTrainingResource | null;

  @Expose()
  @Type(() => BasicWorkingGroupResource)
  workingGroup: BasicWorkingGroupResource;

  @Expose()
  startsAt: Date;

  @Expose()
  endsAt: Date;

  static make = async ({
    appointment,
    workingGroup,
  }: AppointmentInWorkingGroup): Promise<AppointmentResource> => {
    await appointment.loadPresenter();
    await appointment.loadTraining();

    return {
      ...appointment,
      presenter: await BasicConsultantResource.make(appointment.presenter),
      workingGroup: await BasicWorkingGroupResource.make(workingGroup),
      training:
        appointment.training &&
        (await BasicTrainingResource.make(appointment.training)),
    };
  };
}
