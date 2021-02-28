import { Expose } from 'class-transformer';
import { User } from '../../../users/entities/User.entity';

export class Resource {
  @Expose()
  authenticated: boolean;

  @Expose()
  userId: string;

  static make = (user: User): Resource => {
    return { authenticated: true, userId: user.id };
  };
}
