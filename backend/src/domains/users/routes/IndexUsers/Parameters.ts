import { IsInt, Min, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class Parameters {
  @Transform((v) => parseInt(v))
  @IsInt()
  @IsOptional()
  @Min(1)
  amount: number | undefined;
}
