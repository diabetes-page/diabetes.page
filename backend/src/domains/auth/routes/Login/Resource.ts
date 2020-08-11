import { Expose } from 'class-transformer';

export class Resource {
  @Expose()
  token: string;

  static make(token: string): Resource {
    return { token };
  }
}
