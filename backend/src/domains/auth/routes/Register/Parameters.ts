import { IsEmail, IsString, MinLength, Validate } from 'class-validator';
import { Unique } from '../../../../bootstrap/modules/validation/validators/Unique';
import { User } from '../../../users/entities/User.entity';

export class Parameters {
  @IsEmail()
  @Validate(Unique, [User])
  email: string;

  @IsString()
  @MinLength(8) // todo: env, unique constraint
  password: string;
}
