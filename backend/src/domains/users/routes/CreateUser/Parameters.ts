import { IsEmail } from 'class-validator';

export class Parameters {
  @IsEmail()
  email: string;
}
