import { IsEmail, IsString, Validate } from 'class-validator';
import { Unique } from '../../../../bootstrap/modules/validation/validators/Unique';
import { User } from '../../../users/entities/User.entity';
import { Password } from '../../../../bootstrap/modules/validation/validators/Password';

export class Parameters {
  @IsEmail()
  @Validate(Unique, [User])
  email: string;

  @IsString()
  @Validate(Password)
  password: string;
}
