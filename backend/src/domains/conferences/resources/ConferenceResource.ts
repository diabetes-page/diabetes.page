import { Expose } from 'class-transformer';
import { Appointment } from '../../appointments/entities/Appointment.entity';

export class ConferenceResource {
  @Expose()
  conferenceRoom: string;

  @Expose()
  conferenceUpdateCounter: number;

  @Expose()
  presentationIndex: number;

  static make = (appointment: Appointment): ConferenceResource => {
    return appointment;
  };
}
