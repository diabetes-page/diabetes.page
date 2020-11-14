import { Expose } from 'class-transformer';

export class Resource {
  @Expose()
  conferenceToken: string;

  static make = (conferenceToken: string): Resource => {
    return { conferenceToken };
  };
}
