import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash } from 'bcrypt';
import * as Faker from 'faker';
import { sample, times } from 'lodash';
import { Client } from '../../domains/clients/entities/Client.entity';
import { User } from '../../domains/users/entities/User.entity';

@Injectable()
export class Seeder {
  constructor(private configService: ConfigService) {}

  async seed(): Promise<void> {
    console.log('Seeding...');
    times(3, () => this.createClient());
    times(10, () => this.createUser());
  }

  public async createClient(): Promise<Client> {
    return await Client.create({
      name: Faker.company.companyName(),
    }).save();
  }

  public async createUser(): Promise<User> {
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
  }
}
