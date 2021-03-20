import { Injectable } from '@nestjs/common';
import { Consultant } from '../../users/entities/Consultant.entity';
import { WorkingGroup } from '../entities/WorkingGroup.entity';

@Injectable()
export class WorkingGroupsService {
  async getWorkingGroupsForConsultant(
    consultant: Consultant,
  ): Promise<WorkingGroup[]> {
    return await WorkingGroup.find({
      where: {
        creator: consultant,
      },
      order: {
        name: 'ASC',
      },
    });
  }
}
