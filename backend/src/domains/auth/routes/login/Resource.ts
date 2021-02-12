import { Expose, Type } from 'class-transformer';
import { User } from '../../../users/entities/User.entity';
import { SensitiveDataUserResource } from '../../../users/resources/SensitiveDataUserResource';

export class Resource {
  @Expose()
  token: string;

  @Expose()
  @Type(() => SensitiveDataUserResource)
  user: SensitiveDataUserResource;

  static make(token: string, user: User): Resource {
    return { token, user };
  }
}
