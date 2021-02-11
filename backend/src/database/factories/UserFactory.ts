import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash } from 'bcrypt';
import * as Faker from 'faker';
import { Consultant } from '../../domains/users/entities/Consultant.entity';
import { User } from '../../domains/users/entities/User.entity';

@Injectable()
export class UserFactory {
  public static readonly blueprints: Record<string, Partial<User>> = {
    vincent: {
      name: 'Vincent Rolfs',
      email: 'v.rolfs@diabetes.page',
    },
    joe: {
      name: 'Joe Hewett',
      email: 'joehewett1@gmail.com',
    },
    tom: {
      name: 'Tom Diacono',
      email: 'thomas.diacono1999@gmail.com',
    },
    participant: {
      name: 'Participant',
      email: 'p@diabetes.page',
    },
  };

  constructor(private configService: ConfigService) {}

  public createConsultantForUser = async (user: User): Promise<Consultant> => {
    return await Consultant.create({
      user: user,
    }).save();
  };

  public createConsultant = async (
    props: Partial<User> = {},
  ): Promise<Consultant> => {
    const user = await this.createUser(props);

    return await Consultant.create({
      user: user,
    }).save();
  };

  public createUser = async (
    props: Partial<User> = {},
    password = 'rmr',
  ): Promise<User> => {
    const passwordHash = await hash(
      password,
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
