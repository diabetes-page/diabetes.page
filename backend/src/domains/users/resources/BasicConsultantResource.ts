import { Expose, Type } from 'class-transformer';
import { Consultant } from '../entities/Consultant.entity';
import { BasicUserResource } from './BasicUserResource';

export class BasicConsultantResource {
  @Expose()
  id: number;

  @Expose()
  @Type(() => BasicUserResource)
  user: BasicUserResource;

  static make = async (
    consultant: Consultant,
  ): Promise<BasicConsultantResource> => {
    consultant.user || (await consultant.loadUser());
    return consultant;
  };
}
