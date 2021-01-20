import { Transform } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class Parameters {
  @Transform((v) => parseInt(v))
  @IsInt()
  @IsOptional()
  @Min(1)
  amount: number | undefined;
}
