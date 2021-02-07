import { Expose } from 'class-transformer';
import { Consultant } from '../entities/Consultant.entity';
import { BasicUserResource } from './BasicUserResource';

export class BasicConsultantResource {
  @Expose()
  id: number;

  @Expose()
  user: BasicUserResource;

  static make = (consultant: Consultant): BasicConsultantResource => {
    return consultant;
  };
}
