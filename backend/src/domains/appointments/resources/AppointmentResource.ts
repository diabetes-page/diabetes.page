import { Expose, Type } from 'class-transformer';
import { BasicTrainingResource } from '../../trainings/resources/BasicTrainingResource';
import { BasicConsultantResource } from '../../users/resources/BasicConsultantResource';
import { Appointment } from '../entities/Appointment.entity';

export class AppointmentResource {
  @Expose()
  id: string;

  @Expose()
  isRunning: boolean;

  @Expose()
  startsAt: string;

  @Expose()
  endsAt: string;

  @Expose()
  @Type(() => BasicConsultantResource)
  presenter: BasicConsultantResource;

  @Expose()
  @Type(() => BasicTrainingResource)
  training: BasicTrainingResource | null;

  static make = async (
    appointment: Appointment,
  ): Promise<AppointmentResource> => {
    await appointment.loadPresenter();
    await appointment.loadTraining();

    return {
      ...appointment,
      startsAt: appointment.startsAt.toISOString(),
      endsAt: appointment.endsAt.toISOString(),
      presenter: await BasicConsultantResource.make(appointment.presenter),
      training:
        appointment.training &&
        (await BasicTrainingResource.make(appointment.training)),
    };
  };
}
