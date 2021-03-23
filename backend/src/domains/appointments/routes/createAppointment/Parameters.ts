import { IsISO8601, IsString, Validate, ValidateIf } from 'class-validator';
import { Exists } from '../../../../blueprints/validators/Exists';
import { Training } from '../../../trainings/entities/Training.entity';
import { WorkingGroup } from '../../../workingGroups/entities/WorkingGroup.entity';

export class Parameters {
  // Todo: validate that startsAt comes before endsAt
  @IsISO8601()
  startsAt: string;

  @IsISO8601()
  endsAt: string;

  @ValidateIf((object, value) => value !== null) // In order to allow null
  @IsString()
  @Validate(Exists, [Training, 'id'])
  trainingId: string | null;

  @IsString()
  @Validate(Exists, [WorkingGroup, 'id'])
  workingGroupId: string;
}
