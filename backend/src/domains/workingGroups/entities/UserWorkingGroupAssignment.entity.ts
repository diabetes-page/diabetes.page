import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { loadNotNullSingularRelation } from '../../../utilities/relations';
import { User } from '../../users/entities/User.entity';
import { WorkingGroup } from './WorkingGroup.entity';

@Entity()
@Unique(['workingGroup', 'user'])
export class UserWorkingGroupAssignment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => WorkingGroup,
    (workingGroup) => workingGroup.userAssignments,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      nullable: false,
    },
  )
  workingGroup: WorkingGroup;

  async loadWorkingGroup(): Promise<WorkingGroup> {
    return (this.workingGroup = await loadNotNullSingularRelation(
      this,
      'workingGroup',
    ));
  }

  @ManyToOne(() => User, (user) => user.workingGroupAssignments, {
    nullable: false,
  })
  user: User;

  async loadUser(): Promise<User> {
    return (this.user = await loadNotNullSingularRelation(this, 'user'));
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
