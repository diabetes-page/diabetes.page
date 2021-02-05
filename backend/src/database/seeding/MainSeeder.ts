import { Injectable } from '@nestjs/common';
import { sample, times } from 'lodash';
import { BaseEntity } from 'typeorm';
import { LearningBase } from '../../domains/learningBases/entities/LearningBase.entity';
import { Topic } from '../../domains/learningBases/entities/Topic.entity';
import { Consultant } from '../../domains/users/entities/Consultant.entity';
import { mapPromises } from '../../utilities/promises';
import { LearningBaseFactory } from '../factories/LearningBaseFactory';
import { TrainingFactory } from '../factories/TrainingFactory';
import { UserFactory } from '../factories/UserFactory';

@Injectable()
export class MainSeeder {
  constructor(
    public userFactory: UserFactory,
    public learningBaseFactory: LearningBaseFactory,
    public trainingFactory: TrainingFactory,
  ) {}

  public async seed(): Promise<void> {
    console.log('Seeding...');

    await this.seedUsers();
    await this.seedLearningBases();
    await this.seedTopics();
    await this.seedTrainings();
  }

  public async repeat<Entity extends BaseEntity>(
    factory: (iterationNumber: number) => Promise<any>,
    amount: number,
  ): Promise<Entity[]> {
    return Promise.all(times(amount, factory));
  }

  private async seedUsers(): Promise<void> {
    await this.repeat(() => this.userFactory.createUser(), 10);
    await this.userFactory.createConsultant(UserFactory.blueprints.vincent);
    await this.userFactory.createConsultant(UserFactory.blueprints.joe);
    await this.userFactory.createConsultant(UserFactory.blueprints.tom);
  }

  private async seedLearningBases(): Promise<void> {
    await this.repeat(async () => {
      const learningBase = await this.learningBaseFactory.createLearningBase();
      await this.repeat(
        () => this.learningBaseFactory.createTopic(learningBase),
        3,
      );
    }, 3);
  }

  private async seedTopics(): Promise<any> {
    return mapPromises(LearningBase.find(), (learningBase) => {
      return this.repeat(
        () => this.learningBaseFactory.createTopic(learningBase),
        3,
      );
    });
  }

  private async seedTrainings(): Promise<any> {
    const consultants = await Consultant.find();

    return mapPromises(Topic.find(), (topic) => {
      return this.repeat(
        () => this.trainingFactory.createTraining(topic, sample(consultants)!),
        3,
      );
    });
  }
}
