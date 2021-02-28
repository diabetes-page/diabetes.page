import { Expose, Type } from 'class-transformer';
import { TeachingBaseDocumentResource } from '../../teachingBases/resources/TeachingBaseDocumentResource';
import { TopicResource } from '../../teachingBases/resources/TopicResource';
import { BasicUserResource } from '../../users/resources/BasicUserResource';
import { Training } from '../entities/Training.entity';

export class FullTrainingResource {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  slides: number[];

  @Expose()
  @Type(() => TopicResource)
  topic: TopicResource;

  @Expose()
  @Type(() => BasicUserResource)
  teachingBaseDocument: TeachingBaseDocumentResource;

  static make = async (training: Training): Promise<FullTrainingResource> => {
    training.topic || (await training.loadTopic());
    training.teachingBaseDocument ||
      (await training.loadTeachingBaseDocument());

    return training;
  };
}
