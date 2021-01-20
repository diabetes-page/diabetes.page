import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash } from 'bcrypt';
import * as Faker from 'faker';
import { sample, times } from 'lodash';
import { BaseEntity } from 'typeorm';
import { Client } from '../../domains/clients/entities/Client.entity';
import { User } from '../../domains/users/entities/User.entity';

@Injectable()
export class Seeder {
  constructor(private configService: ConfigService) {}

  async seed(): Promise<void> {
    console.log('Seeding...');

    await this.repeat(this.createClient, 3);
    await this.repeat(this.createUser, 10);
  }

  public async repeat<Entity extends BaseEntity>(
    factory: (iterationNumber: number) => Promise<Entity>,
    amount: number,
  ): Promise<Entity[]> {
    return Promise.all(times(amount, factory));
  }

  public createClient = async (): Promise<Client> => {
    return await Client.create({
      name: Faker.company.companyName(),
    }).save();
  };

  public createUser = async (): Promise<User> => {
    const passwordHash = await hash(
      'example',
      this.configService.get<number>('security.bcryptSaltRounds', 10),
    );

    return await User.create({
      name: Faker.name.findName(),
      email: Faker.internet.email(),
      client: sample(await Client.find()),
      password: passwordHash,
    }).save();
  };
}
