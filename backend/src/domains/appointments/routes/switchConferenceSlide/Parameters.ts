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
  // Todo: Max slide index
  @IsInt()
  @Min(0)
  slideIndex: number;
}
