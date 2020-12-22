import { Expose } from 'class-transformer';

export class OfficialMessageResource {
  @Expose()
  officialMessage: string;

  static make = (officialMessage: string): OfficialMessageResource => {
    return { officialMessage };
  };
}
