import { Expose } from 'class-transformer';
import { Appointment } from '../../../appointments/entities/Appointment.entity';

export class Resource {
  @Expose()
  conferenceRoom: string;

  @Expose()
  conferenceToken: string;

  @Expose()
  conferenceUpdateCounter: number;

  @Expose()
  presentationIndex: number;

  @Expose()
  officialMessagePublicKey: string;

  static make = (
    conferenceToken: string,
    appointment: Appointment,
  ): Resource => {
    return { conferenceToken, ...appointment };
  };
}
