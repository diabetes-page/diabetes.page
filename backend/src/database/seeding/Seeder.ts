import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash } from 'bcrypt';
import * as Faker from 'faker';
import { times } from 'lodash';
import { BaseEntity } from 'typeorm';
import { User } from '../../domains/users/entities/User.entity';

@Injectable()
export class Seeder {
  constructor(private configService: ConfigService) {}

  async seed(): Promise<void> {
    console.log('Seeding...');

    await this.repeat(() => this.createUser(), 10);
  }

  public async repeat<Entity extends BaseEntity>(
    factory: (iterationNumber: number) => Promise<Entity>,
    amount: number,
  ): Promise<Entity[]> {
    return Promise.all(times(amount, factory));
  }

  public createUser = async (props: Partial<User> = {}): Promise<User> => {
    const passwordHash = await hash(
      'example',
      this.configService.get<number>('security.bcryptSaltRounds', 10),
    );

    return await User.create({
      name: Faker.name.findName(),
      email: Faker.internet.email(),
      password: passwordHash,
      ...props,
    }).save();
  };
}
