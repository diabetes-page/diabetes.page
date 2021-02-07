import { Expose } from 'class-transformer';
import { User } from '../entities/User.entity';

export class SensitiveDataUserResource {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  static make = (user: User): SensitiveDataUserResource => {
    return user;
  };
}
