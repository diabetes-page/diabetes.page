import { Expose } from 'class-transformer';
import { User } from '../entities/User.entity';

export class SensitiveDataUserResource {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  isConsultant: boolean;

  @Expose()
  isManager: boolean;

  static make = async (user: User): Promise<SensitiveDataUserResource> => {
    const consultant = user.asConsultant || (await user.loadAsConsultant());
    const manager =
      consultant?.asManager || (await consultant?.loadAsManager());

    return {
      ...user,
      isConsultant: !!consultant,
      isManager: !!manager,
    };
  };
}
