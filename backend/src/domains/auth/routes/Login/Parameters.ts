import { IsEmail, IsString } from 'class-validator';

export class Parameters {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
