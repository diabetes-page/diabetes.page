import { Injectable } from '@nestjs/common';
import * as Faker from 'faker';
import { Consultant } from '../../domains/users/entities/Consultant.entity';
import { WorkingGroup } from '../../domains/workingGroups/entities/WorkingGroup.entity';

@Injectable()
export class WorkingGroupFactory {
  public createWorkingGroup = async (
    creator: Consultant,
    props: Partial<WorkingGroup> = {},
  ): Promise<WorkingGroup> => {
    const name = Faker.commerce.productName();
    const description = Faker.commerce.productDescription();

    return WorkingGroup.create({
      name,
      description,
      creator,
      ...props,
    }).save();
  };
}
