import { Expose } from 'class-transformer';

export class AppointmentResource {
  @Expose()
  id: number;
}
