import { Expose, Type } from 'class-transformer';
import { User } from '../../entities/User.entity';
import { SensitiveDataUserResource } from '../../resources/SensitiveDataUserResource';

export class Resource {
  @Expose()
  @Type(() => SensitiveDataUserResource)
  users: SensitiveDataUserResource[];

  static make = (users: User[]): Resource => {
    return { users };
  };
}
