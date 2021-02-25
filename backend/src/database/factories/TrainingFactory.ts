import { Injectable } from '@nestjs/common';
import * as Faker from 'faker';
import { times } from 'lodash';
import { TeachingBaseDocument } from '../../domains/teachingBases/entities/TeachingBaseDocument.entity';
import { Topic } from '../../domains/teachingBases/entities/Topic.entity';
import { Training } from '../../domains/trainings/entities/Training.entity';
import { Consultant } from '../../domains/users/entities/Consultant.entity';

@Injectable()
export class TrainingFactory {
  public createTraining = async (
    topic: Topic,
    teachingBaseDocument: TeachingBaseDocument,
    creator: Consultant,
    props: Partial<Training> = {},
  ): Promise<Training> => {
    return Training.create({
      name: `${topic.name}: ${Faker.lorem.word()}`,
      slides: times(Faker.random.number({ min: 10, max: 30 }), () =>
        Faker.random.number({ min: 1, max: 40 }),
      ),
      topic,
      teachingBaseDocument,
      creator,
      ...props,
    }).save();
  };
}
