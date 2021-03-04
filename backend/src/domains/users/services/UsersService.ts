import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash } from 'bcrypt';
import * as crypto from 'crypto';
import { User } from '../entities/User.entity';

@Injectable()
export class UsersService {
  constructor(private configService: ConfigService) {}

  async get(id: number): Promise<User | undefined> {
    return User.findOne({ where: { id } });
  }

  async all(): Promise<User[]> {
    return User.find();
  }

  async where(fields: Partial<User>): Promise<User[]> {
    return User.find({ where: fields });
  }

  async oneWhere(fields: Partial<User>): Promise<User | undefined> {
    return User.findOne({ where: fields });
  }

  async add(
    name: string,
    email: string,
    cleartextPassword: string | null = null,
  ): Promise<User> {
    const passwordHash = cleartextPassword
      ? await hash(
          cleartextPassword,
          this.configService.get<number>('security.bcryptSaltRounds', 10),
        )
      : cleartextPassword;

    // @ts-ignore
    const verificationToken = crypto.randomUUID();

    return await User.create({
      name,
      email,
      password: passwordHash,
      verificationToken: verificationToken.toString(),
    }).save();
  }
}
