import { IsInt, IsString } from 'class-validator';

export class Parameters {
  @IsInt()
  amount: number;

  @IsString()
  name: string;
}
