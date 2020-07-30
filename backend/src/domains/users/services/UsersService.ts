import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/User.entity';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  find(options?: FindManyOptions): Promise<User[]> {
    return this.usersRepository.find(options);
  }

  async create(firstName: string, lastName: string): Promise<User> {
    return await this.usersRepository.save(
      this.usersRepository.create({
        firstName,
        lastName,
      }),
    );
  }
}
