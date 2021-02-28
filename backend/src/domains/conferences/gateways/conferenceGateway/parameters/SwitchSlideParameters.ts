import { Min } from 'class-validator';

export class SwitchSlideParameters {
  // Todo: Max the number of slides - 1
  @Min(0)
  slideIndex: number;
}
