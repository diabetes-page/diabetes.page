import { sortBy } from 'lodash';
import { AbstractRepository, EntityRepository } from 'typeorm';
import { User } from '../entities/User.entity';

@EntityRepository(User)
export class UsersRepository extends AbstractRepository<User> {
  async index(): Promise<User[]> {
    const users = await this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.workingGroups', 'workingGroup')
      .orderBy('workingGroup.name')
      .getMany();

    return sortBy(users, (user) => user.sortingKey);
  }
}
