import { Expose, Type } from 'class-transformer';
import { User } from '../../entities/User.entity';

class UserWithEmail extends User {
  @Expose()
  email: string;
}

export class Resource {
  @Expose()
  @Type(() => UserWithEmail)
  users: UserWithEmail[];

  static make = (users: User[]): Resource => {
    return { users };
  };
}
