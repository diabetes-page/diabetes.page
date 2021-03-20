import { Expose, Type } from 'class-transformer';
import { WorkingGroup } from '../../entities/WorkingGroup.entity';
import { BasicWorkingGroupResource } from '../../resources/BasicWorkingGroupResource';

export class Resource {
  @Expose()
  @Type(() => BasicWorkingGroupResource)
  workingGroups: BasicWorkingGroupResource[];

  static make = async (workingGroups: WorkingGroup[]): Promise<Resource> => {
    return {
      workingGroups: workingGroups.map((workingGroups) =>
        BasicWorkingGroupResource.make(workingGroups),
      ),
    };
  };
}
