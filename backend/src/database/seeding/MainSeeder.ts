import { Injectable } from '@nestjs/common';
import { sample, times } from 'lodash';
import { BaseEntity } from 'typeorm';
import { LearningBase } from '../../domains/learningBases/entities/LearningBase.entity';
import { Topic } from '../../domains/learningBases/entities/Topic.entity';
import { Training } from '../../domains/trainings/entities/Training.entity';
import { Consultant } from '../../domains/users/entities/Consultant.entity';
import { User } from '../../domains/users/entities/User.entity';
import { eachPromise, mapPromises } from '../../utilities/promises';
import { AppointmentFactory } from '../factories/AppointmentFactory';
import { LearningBaseFactory } from '../factories/LearningBaseFactory';
import { TrainingFactory } from '../factories/TrainingFactory';
import { UserFactory } from '../factories/UserFactory';

@Injectable()
export class MainSeeder {
  constructor(
    public userFactory: UserFactory,
    public learningBaseFactory: LearningBaseFactory,
    public trainingFactory: TrainingFactory,
    public appointmentFactory: AppointmentFactory,
  ) {}

  public async seed(): Promise<void> {
    console.log('Seeding...');

    await this.seedUsers();
    await this.seedLearningBases();
    await this.seedTopics();
    await this.seedTrainings();
    await this.seedAppointments();
  }

  public async repeat<Entity extends BaseEntity>(
    factory: (iterationNumber: number) => Promise<any>,
    amount: number,
  ): Promise<Entity[]> {
    return Promise.all(times(amount, factory));
  }

  private async seedUsers(): Promise<void> {
    console.log('Seeding users...');
    await this.repeat(() => this.userFactory.createUser(), 10);
    await this.userFactory.createConsultant(UserFactory.blueprints.vincent);
    await this.userFactory.createConsultant(UserFactory.blueprints.joe);
    await this.userFactory.createConsultant(UserFactory.blueprints.tom);
  }

  private async seedLearningBases(): Promise<void> {
    console.log('Seeding learning bases...');
    await this.repeat(async () => {
      const learningBase = await this.learningBaseFactory.createLearningBase();
      await this.repeat(
        () => this.learningBaseFactory.createTopic(learningBase),
        1,
      );
    }, 1);
  }

  private async seedTopics(): Promise<any> {
    console.log('Seeding topics...');
    return mapPromises(LearningBase.find(), (learningBase) => {
      return this.repeat(
        () => this.learningBaseFactory.createTopic(learningBase),
        1,
      );
    });
  }

  private async seedTrainings(): Promise<any> {
    console.log('Seeding trainings...');
    const consultants = await Consultant.find();

    return mapPromises(Topic.find(), (topic) => {
      return this.repeat(
        () => this.trainingFactory.createTraining(topic, sample(consultants)!),
        3,
      );
    });
  }

  private async seedAppointments(): Promise<any> {
    console.log('Seeding appointments...');
    const consultants = await Consultant.find();

    await mapPromises(Training.find(), (training) => {
      return this.repeat(async () => {
        const appointment = await this.appointmentFactory.createAppointment(
          training,
          sample(consultants)!,
        );

        await eachPromise(
          await User.find(),
          async (user: User): Promise<void> => {
            await this.appointmentFactory.createUserAppointmentAssignment(
              user,
              appointment,
            );
          },
        );
      }, 3);
    });
  }
}
