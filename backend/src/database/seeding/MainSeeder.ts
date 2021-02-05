import { Injectable } from '@nestjs/common';
import { times } from 'lodash';
import { BaseEntity } from 'typeorm';
import { UserFactory } from '../factories/UserFactory';

@Injectable()
export class MainSeeder {
  constructor(public userFactory: UserFactory) {}

  public async seed(): Promise<void> {
    console.log('Seeding...');

    await this.repeat(() => this.userFactory.createUser(), 10);
    await this.repeat(() => this.userFactory.createConsultant(), 3);
  }

  public async repeat<Entity extends BaseEntity>(
    factory: (iterationNumber: number) => Promise<Entity>,
    amount: number,
  ): Promise<Entity[]> {
    return Promise.all(times(amount, factory));
  }
}
