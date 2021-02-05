import { Expose } from 'class-transformer';

export class Resource {
  @Expose()
  authenticated: boolean;

  static make = (): Resource => {
    return { authenticated: true };
  };
}
