import { Injectable } from '@nestjs/common';
import * as Faker from 'faker';
import { LearningBase } from '../../domains/learningBases/entities/LearningBase.entity';
import { Topic } from '../../domains/learningBases/entities/Topic.entity';

@Injectable()
export class LearningBaseFactory {
  public createLearningBase = async (
    props: Partial<LearningBase> = {},
  ): Promise<LearningBase> => {
    return LearningBase.create({
      name: Faker.lorem.word(),
      ...props,
    }).save();
  };

  public createTopic = async (
    learningBase: LearningBase,
    props: Partial<Topic> = {},
  ): Promise<Topic> => {
    return Topic.create({
      learningBase: learningBase,
      name: Faker.company.catchPhrase(),
      ...props,
    }).save();
  };
}
