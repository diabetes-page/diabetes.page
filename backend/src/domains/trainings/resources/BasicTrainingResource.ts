import { Expose } from 'class-transformer';
import { Training } from '../entities/Training.entity';

export class BasicTrainingResource {
  @Expose()
  id: number;

  @Expose()
  name: string;

  static make = (training: Training): BasicTrainingResource => {
    return training;
  };
}
