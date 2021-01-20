import { IsInt, Min } from 'class-validator';

export class Parameters {
  // Todo: Check max index
  @IsInt()
  @Min(0)
  presentationIndex: number;
}
