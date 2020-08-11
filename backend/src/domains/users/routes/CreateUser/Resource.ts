import { User } from '../../entities/User.entity';
import { Expose } from 'class-transformer';

export class Resource extends User {
  @Expose()
  email: string;

  static make(user: User): Resource {
    return user;
  }
}
