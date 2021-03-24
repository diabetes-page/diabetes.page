import { Injectable } from '@nestjs/common';
import * as Faker from 'faker';
import { TeachingBase } from '../../domains/teachingBases/entities/TeachingBase.entity';
import { TeachingBaseDocument } from '../../domains/teachingBases/entities/TeachingBaseDocument.entity';
import { Topic } from '../../domains/teachingBases/entities/Topic.entity';

@Injectable()
export class TeachingBaseFactory {
  public createTeachingBase = async (
    props: Partial<TeachingBase> = {},
  ): Promise<TeachingBase> => {
    return TeachingBase.create({
      name: Faker.lorem.word(),
      ...props,
    }).save();
  };

  public createTopic = async (
    teachingBase: TeachingBase,
    props: Partial<Topic> = {},
  ): Promise<Topic> => {
    return Topic.create({
      teachingBase: teachingBase,
      name: Faker.company.bsAdjective() + ' topic',
      ...props,
    }).save();
  };

  public createDocument = async (
    teachingBase: TeachingBase,
    props: Partial<TeachingBaseDocument> = {},
  ): Promise<TeachingBaseDocument> => {
    const name = Faker.lorem.word();

    return TeachingBaseDocument.create({
      teachingBase: teachingBase,
      name: name,
      documentPath: name + '.pdf',
      ...props,
    }).save();
  };
}
