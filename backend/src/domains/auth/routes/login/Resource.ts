import { Expose, Type } from 'class-transformer';
import { User } from '../../../users/entities/User.entity';
import { SensitiveDataUserResource } from '../../../users/resources/SensitiveDataUserResource';

export class Resource {
  @Expose()
  token: string;

  @Expose()
  @Type(() => SensitiveDataUserResource)
  user: SensitiveDataUserResource;

  static async make(token: string, user: User): Promise<Resource> {
    return { token, user: await SensitiveDataUserResource.make(user) };
  }
}
