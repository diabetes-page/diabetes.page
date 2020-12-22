import { Expose } from 'class-transformer';
import { Appointment } from '../../entities/Appointment.entity';

export class Resource extends Appointment {
  @Expose()
  conferenceToken: string;

  @Expose()
  conferenceRoom: string;

  @Expose()
  presentationIndex: number;

  static make = (
    conferenceToken: string,
    appointment: Appointment,
  ): Resource => {
    return { conferenceToken, ...appointment };
  };
}
