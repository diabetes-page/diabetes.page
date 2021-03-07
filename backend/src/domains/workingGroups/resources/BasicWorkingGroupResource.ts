import { Expose } from 'class-transformer';
import { WorkingGroup } from '../entities/WorkingGroup.entity';

export class BasicWorkingGroupResource {
  @Expose()
  id: string;

  @Expose()
  name: string;

  static make = (workingGroup: WorkingGroup): BasicWorkingGroupResource => {
    return workingGroup;
  };
}
