import { Expose, Type } from 'class-transformer';
import { User } from '../../entities/User.entity';
import { ResourceType } from '../../../../bootstrap/interceptors/ResourceInterceptor';

export class Resource extends ResourceType {
  @Expose()
  @Type(() => UserWithEmail)
  users: UserWithEmail[];

  static make = (users: User[]): Resource => {
    return { users };
  };
}

class UserWithEmail extends User {
  @Expose()
  email: string;
}
