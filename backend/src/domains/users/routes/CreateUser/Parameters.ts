import { IsString, MinLength } from 'class-validator';

export class Parameters {
  @IsString()
  @MinLength(1)
  firstName: string;

  @IsString()
  @MinLength(1)
  lastName: string;
}
