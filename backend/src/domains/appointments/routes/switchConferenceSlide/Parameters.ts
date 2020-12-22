import {
  IsEmail,
  IsInt,
  IsString,
  Min,
  MinLength,
  Validate,
} from 'class-validator';
import { Unique } from '../../../../blueprints/validators/Unique';
import { User } from '../../../users/entities/User.entity';

export class Parameters {
  // Todo: Check max index
  @IsInt()
  @Min(0)
  presentationIndex: number;
}
