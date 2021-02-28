import { Expose } from 'class-transformer';
import { User } from '../entities/User.entity';

export class BasicUserResource {
  @Expose()
  id: string;

  @Expose()
  name: string;

  static make = (user: User): BasicUserResource => {
    return user;
  };
}
