import { Expose } from 'class-transformer';

export class UserResource {
  @Expose()
  id: number;

  @Expose()
  email: string;
}
