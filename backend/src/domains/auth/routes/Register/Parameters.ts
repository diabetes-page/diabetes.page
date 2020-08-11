import { IsEmail, IsString, MinLength } from 'class-validator';

export class Parameters {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8) // todo: env, unique constraint
  password: string;
}
