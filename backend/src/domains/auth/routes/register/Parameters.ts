import { IsEmail, IsString, MinLength, Validate } from 'class-validator';
import { Unique } from '../../../../blueprints/validators/Unique';
import { User } from '../../../users/entities/User.entity';

export class Parameters {
  @IsEmail()
  @Validate(Unique, [User])
  email: string;

  @IsString()
  password: string;

  @IsString()
  @MinLength(1)
  name: string;
}
