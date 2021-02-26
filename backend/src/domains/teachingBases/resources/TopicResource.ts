import { Expose } from 'class-transformer';
import { Topic } from '../entities/Topic.entity';

export class TopicResource {
  @Expose()
  id: number;

  @Expose()
  name: string;

  static make = (topic: Topic): TopicResource => {
    return topic;
  };
}
