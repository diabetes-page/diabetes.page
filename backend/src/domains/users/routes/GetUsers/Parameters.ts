import { IsInt, Min, IsOptional } from 'class-validator';

export class Parameters {
  @IsInt()
  @Min(1)
  @IsOptional()
  amount: number;
}
