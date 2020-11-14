import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User.entity';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async get(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async all(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async where(fields: Partial<User>): Promise<User[]> {
    return this.usersRepository.find({ where: fields });
  }

  async oneWhere(fields: Partial<User>): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: fields });
  }

  async make(email: string, password: string): Promise<User> {
    return await this.usersRepository.save(
      this.usersRepository.create({
        email,
        password: await hash(
          password,
          this.configService.get<number>('security.bcryptSaltRounds', 10),
        ),
      }),
    );
  }
}
