import { Expose, Type } from 'class-transformer';
import { User } from '../../entities/User.entity';
import { UserResource } from '../../resources/UserResource';

export class Resource {
  @Expose()
  @Type(() => UserResource)
  users: UserResource[];

  static make = (users: User[]): Resource => {
    return { users };
  };
}
