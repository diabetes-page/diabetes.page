import { Expose } from 'class-transformer';
import { Appointment } from '../../entities/Appointment.entity';

export class Resource {
  @Expose()
  id: number;

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
