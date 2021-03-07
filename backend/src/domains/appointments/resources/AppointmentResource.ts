import { Expose, Type } from 'class-transformer';
import { formatISO } from 'date-fns';
import { BasicTrainingResource } from '../../trainings/resources/BasicTrainingResource';
import { BasicConsultantResource } from '../../users/resources/BasicConsultantResource';
import { Appointment } from '../entities/Appointment.entity';

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
  startsAt: string;

  @Expose()
  endsAt: string;

  static make = async (
    appointment: Appointment,
  ): Promise<AppointmentResource> => {
    await appointment.loadPresenter();
    await appointment.loadTraining();

    return {
      ...appointment,
      startsAt: formatISO(appointment.startsAt),
      endsAt: formatISO(appointment.endsAt),
      presenter: await BasicConsultantResource.make(appointment.presenter),
      training:
        appointment.training &&
        (await BasicTrainingResource.make(appointment.training)),
    };
  };
}
