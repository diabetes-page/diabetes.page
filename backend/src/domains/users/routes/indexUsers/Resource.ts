import { Expose, Type } from 'class-transformer';
import { sortBy } from 'lodash';
import { mapPromises } from '../../../../utilities/promises';
import { User } from '../../entities/User.entity';
import { SensitiveDataUserResource } from '../../resources/SensitiveDataUserResource';

export class Resource {
  @Expose()
  @Type(() => SensitiveDataUserResource)
  users: SensitiveDataUserResource[];

  static make = async (users: User[]): Promise<Resource> => {
    const usersSorted = sortBy(users, (user) => user.sortingKey);

    return {
      users: await mapPromises(usersSorted, (user) =>
        SensitiveDataUserResource.make(user),
      ),
    };
  };
}
