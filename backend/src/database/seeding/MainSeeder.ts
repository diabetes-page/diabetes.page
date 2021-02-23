import { Injectable } from '@nestjs/common';
import { sample, times } from 'lodash';
import { BaseEntity } from 'typeorm';
import { Appointment } from '../../domains/appointments/entities/Appointment.entity';
import { LearningBase } from '../../domains/learningBases/entities/LearningBase.entity';
import { Topic } from '../../domains/learningBases/entities/Topic.entity';
import { Training } from '../../domains/trainings/entities/Training.entity';
import { Consultant } from '../../domains/users/entities/Consultant.entity';
import { User } from '../../domains/users/entities/User.entity';
import { WorkingGroup } from '../../domains/workingGroups/entities/WorkingGroup.entity';
import { eachPromise, mapPromises } from '../../utilities/promises';
import { AppointmentFactory } from '../factories/AppointmentFactory';
import { LearningBaseFactory } from '../factories/LearningBaseFactory';
import { TrainingFactory } from '../factories/TrainingFactory';
import { UserFactory } from '../factories/UserFactory';
import { WorkingGroupFactory } from '../factories/WorkingGroupFactory';

@Injectable()
export class MainSeeder {
  constructor(
    public userFactory: UserFactory,
    public learningBaseFactory: LearningBaseFactory,
    public trainingFactory: TrainingFactory,
    public appointmentFactory: AppointmentFactory,
    public workingGroupFactory: WorkingGroupFactory,
  ) {}

  public async seed(): Promise<void> {
    console.log('Seeding...');

    await this.seedUsers();
    await this.seedLearningBases();
    await this.seedTopics();
    await this.seedTrainings();
    await this.seedAppointments();
    await this.seedWorkingGroups();
    await this.addUsersToWorkingGroups();
  }

  public async repeat<Entity extends BaseEntity>(
    factory: (iterationNumber: number) => Promise<any>,
    amount: number,
  ): Promise<Entity[]> {
    return Promise.all(times(amount, factory));
  }

  private async seedUsers(): Promise<void> {
    console.log('Seeding users...');
    await this.repeat(() => this.userFactory.createUser(), 100);
    await this.userFactory.createUser(UserFactory.blueprints.participant);
    await this.userFactory.createConsultant(UserFactory.blueprints.vincent);
    await this.userFactory.createConsultant(UserFactory.blueprints.joe);
    await this.userFactory.createConsultant(UserFactory.blueprints.tom);
  }

  private async seedLearningBases(): Promise<void> {
    console.log('Seeding learning bases...');
    await this.repeat(
      async () => this.learningBaseFactory.createLearningBase(),
      2,
    );
  }

  private async seedTopics(): Promise<any> {
    console.log('Seeding topics...');
    return mapPromises(LearningBase.find(), (learningBase) => {
      return this.repeat(
        () => this.learningBaseFactory.createTopic(learningBase),
        2,
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
      return this.repeat(
        async () =>
          this.appointmentFactory.createAppointment(
            training,
            sample(consultants)!,
          ),
        3,
      );
    });
  }

  private async seedWorkingGroups(): Promise<any> {
    console.log('Seeding working groups...');
    const consultants = await Consultant.find();
    const appointmentsGrouped: Appointment[][] = [];

    await eachPromise(Training.find(), async (training) =>
      eachPromise(training.loadAppointments(), async (appointment, index) => {
        if (!appointmentsGrouped[index]) {
          appointmentsGrouped[index] = [];
        }

        appointmentsGrouped[index].push(appointment);
      }),
    );

    return eachPromise(
      appointmentsGrouped,
      async (appointments) =>
        void (await this.workingGroupFactory.createWorkingGroup(
          sample(consultants)!,
          {
            appointments,
          },
        )),
    );
  }

  private async addUsersToWorkingGroups(): Promise<any> {
    console.log('Adding users to working groups...');
    const users = await User.find();
    const workingGroups = await WorkingGroup.find();

    await eachPromise(
      workingGroups,
      async (workingGroup) => void (await workingGroup.loadUsers()),
    );

    await eachPromise(users, async (user) => {
      const asConsultant = await user.loadAsConsultant();

      if (!asConsultant) {
        sample(workingGroups)!.users.push(user);
      }
    });

    return eachPromise(
      workingGroups,
      async (workingGroup) => void (await workingGroup.save()),
    );
  }
}
