import { IsEmail, IsString, Validate } from 'class-validator';
import { Unique } from '../../../../blueprints/validators/Unique';
import { User } from '../../../users/entities/User.entity';
import { Password } from '../../../../blueprints/validators/Password';

export class Parameters {
  @IsEmail()
  @Validate(Unique, [User])
  email: string;

  @IsString()
  @Validate(Password)
  password: string;
}
