import { Expose, Type } from 'class-transformer';
import { BasicWorkingGroupResource } from '../../workingGroups/resources/BasicWorkingGroupResource';
import { User } from '../entities/User.entity';

export class SensitiveDataUserResource {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  consultantId: string | null;

  @Expose()
  managerId: string | null;

  @Expose()
  @Type(() => BasicWorkingGroupResource)
  workingGroups: BasicWorkingGroupResource[];

  static make = async (user: User): Promise<SensitiveDataUserResource> => {
    if (!user.workingGroups) {
      await user.loadWorkingGroups();
    }

    const consultant = user.asConsultant || (await user.loadAsConsultant());
    const manager =
      consultant?.asManager || (await consultant?.loadAsManager());

    return {
      ...user,
      consultantId: consultant?.id || null,
      managerId: manager?.id || null,
      workingGroups: user.workingGroups.map((g) =>
        BasicWorkingGroupResource.make(g),
      ),
    };
  };
}
