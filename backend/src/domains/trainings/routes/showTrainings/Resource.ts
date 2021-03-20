import { Expose, Type } from 'class-transformer';
import { Training } from '../../entities/Training.entity';
import { BasicTrainingResource } from '../../resources/BasicTrainingResource';

export class Resource {
  @Expose()
  @Type(() => BasicTrainingResource)
  trainings: BasicTrainingResource[];

  static make = async (trainings: Training[]): Promise<Resource> => {
    return {
      trainings: trainings.map((training) =>
        BasicTrainingResource.make(training),
      ),
    };
  };
}
