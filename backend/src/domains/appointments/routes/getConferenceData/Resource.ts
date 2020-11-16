import { Expose } from 'class-transformer';

export class Resource {
  @Expose()
  conferenceToken: string;

  @Expose()
  room: string;

  static make = (conferenceToken: string, room: string): Resource => {
    return { conferenceToken, room };
  };
}
