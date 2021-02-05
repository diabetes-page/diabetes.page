import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash } from 'bcrypt';
import * as Faker from 'faker';
import { Consultant } from '../../domains/users/entities/Consultant.entity';
import { User } from '../../domains/users/entities/User.entity';

@Injectable()
export class UserFactory {
  constructor(private configService: ConfigService) {}

  public createConsultant = async (
    props: Partial<User> = {},
  ): Promise<Consultant> => {
    const user = await this.createUser(props);

    return await Consultant.create({
      user: user,
    }).save();
  };

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
