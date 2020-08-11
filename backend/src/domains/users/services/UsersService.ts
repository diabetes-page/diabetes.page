import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User.entity';
import { FindManyOptions, FindOneOptions } from 'typeorm/index';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async get(id: number): Promise<User | undefined> {
    return this.one({ where: { id } });
  }

  async one(options?: FindOneOptions): Promise<User | undefined> {
    return this.usersRepository.findOne(options);
  }

  async all(options?: FindManyOptions): Promise<User[]> {
    return this.usersRepository.find(options);
  }

  async create(email: string): Promise<User> {
    return await this.usersRepository.save(
      this.usersRepository.create({
        email,
        password: await hash('xxx', 10), // todo: salt rounds in env, user set password
      }),
    );
  }
}
