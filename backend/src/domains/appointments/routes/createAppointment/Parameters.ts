import { IsISO8601 } from 'class-validator';

export class Parameters {
  // Todo: validate that startsAt comes before endsAt
  @IsISO8601()
  startsAt: string;

  @IsISO8601()
  endsAt: string;
}
