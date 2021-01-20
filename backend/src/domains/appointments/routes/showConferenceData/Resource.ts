import { Expose } from 'class-transformer';
import { Appointment } from '../../entities/Appointment.entity';
import { AppointmentResource } from '../../resources/AppointmentResource';

export class Resource extends AppointmentResource {
  @Expose()
  conferenceToken: string;

  @Expose()
  conferenceRoom: string;

  @Expose()
  presentationIndex: number;

  @Expose()
  conferenceUpdateCounter: number;

  @Expose()
  officialMessagePublicKey: string;

  static make = (
    conferenceToken: string,
    appointment: Appointment,
  ): Resource => {
    return { conferenceToken, ...appointment };
  };
}
