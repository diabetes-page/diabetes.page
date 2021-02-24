import { Injectable } from '@nestjs/common';
import { Topic } from '../../domains/teachingBases/entities/Topic.entity';
import { Training } from '../../domains/trainings/entities/Training.entity';
import { Consultant } from '../../domains/users/entities/Consultant.entity';

@Injectable()
export class TrainingFactory {
  public createTraining = async (
    topic: Topic,
    creator: Consultant,
    props: Partial<Training> = {},
  ): Promise<Training> => {
    return Training.create({
      name: `${topic.name} by ${(await creator.loadUser()).name}`,
      topic,
      creator,
      ...props,
    }).save();
  };
}
