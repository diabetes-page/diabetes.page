import { Expose } from 'class-transformer';
import { BasicConsultantResource } from '../../users/resources/BasicConsultantResource';

export class AppointmentResource {
  @Expose()
  id: number;

  @Expose()
  presenter: BasicConsultantResource;
}
