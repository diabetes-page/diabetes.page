import { Expose, Type } from 'class-transformer';
import { BasicConsultantResource } from '../../users/resources/BasicConsultantResource';
import { Appointment } from '../entities/Appointment.entity';

export class AppointmentResource {
  @Expose()
  id: number;

  @Expose()
  @Type(() => BasicConsultantResource)
  presenter: BasicConsultantResource;

  static make = async (
    appointment: Appointment,
  ): Promise<AppointmentResource> => {
    await appointment.loadPresenter();

    return {
      ...appointment,
      presenter: await BasicConsultantResource.make(appointment.presenter),
    };
  };
}
