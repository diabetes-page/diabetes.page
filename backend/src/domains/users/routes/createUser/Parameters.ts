import { IsEmail, IsString, MinLength, Validate } from 'class-validator';
import { Unique } from '../../../../blueprints/validators/Unique';
import { User } from '../../entities/User.entity';

export class Parameters {
  @IsEmail()
  @Validate(Unique, [User])
  email: string;

  @IsString()
  @MinLength(1)
  name: string;
}
