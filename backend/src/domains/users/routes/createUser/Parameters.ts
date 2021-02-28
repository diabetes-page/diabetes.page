import { IsEmail, IsString, MinLength, Validate } from 'class-validator';
import { Password } from '../../../../blueprints/validators/Password';
import { Unique } from '../../../../blueprints/validators/Unique';
import { User } from '../../entities/User.entity';

export class Parameters {
  @IsEmail()
  @Validate(Unique, [User])
  email: string;

  @IsString()
  @Validate(Password)
  password: string;

  @IsString()
  @MinLength(1)
  name: string;
}
