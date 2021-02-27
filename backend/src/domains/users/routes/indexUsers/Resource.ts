import { Expose, Type } from 'class-transformer';
import { mapPromises } from '../../../../utilities/promises';
import { User } from '../../entities/User.entity';
import { SensitiveDataUserResource } from '../../resources/SensitiveDataUserResource';

export class Resource {
  @Expose()
  @Type(() => SensitiveDataUserResource)
  users: SensitiveDataUserResource[];

  static make = async (users: User[]): Promise<Resource> => {
    return {
      users: await mapPromises(users, (user) =>
        SensitiveDataUserResource.make(user),
      ),
    };
  };
}
