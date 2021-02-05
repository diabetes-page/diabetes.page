import { Injectable } from '@nestjs/common';
import { times } from 'lodash';
import { BaseEntity } from 'typeorm';
import { LearningBaseFactory } from '../factories/LearningBaseFactory';
import { UserFactory } from '../factories/UserFactory';

@Injectable()
export class MainSeeder {
  constructor(
    public userFactory: UserFactory,
    public learningBaseFactory: LearningBaseFactory,
  ) {}

  public async seed(): Promise<void> {
    console.log('Seeding...');

    await this.seedUsers();
    await this.seedLearningBases();
  }

  public async repeat<Entity extends BaseEntity>(
    factory: (iterationNumber: number) => Promise<any>,
    amount: number,
  ): Promise<Entity[]> {
    return Promise.all(times(amount, factory));
  }

  private async seedUsers(): Promise<void> {
    await this.repeat(() => this.userFactory.createUser(), 10);
    await this.repeat(() => this.userFactory.createConsultant(), 3);
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
}
