import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  loadNullableSingularRelation,
  loadPluralRelation,
} from '../../../utilities/relations';
import { UserWorkingGroupAssignment } from '../../workingGroups/entities/UserWorkingGroupAssignment.entity';
import { Consultant } from './Consultant.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ type: 'character varying', nullable: true })
  verificationToken: string | null;

  @OneToMany(() => UserWorkingGroupAssignment, (assignment) => assignment.user)
  workingGroupAssignments: UserWorkingGroupAssignment[];

  async loadWorkingGroupAssignments(): Promise<UserWorkingGroupAssignment[]> {
    return (this.workingGroupAssignments = await loadPluralRelation<
      User,
      'workingGroupAssignments'
    >(this, 'workingGroupAssignments'));
  }

  @OneToOne(() => Consultant, (consultant) => consultant.user, {
    cascade: true,
  })
  asConsultant: Consultant | null;
  async loadAsConsultant(): Promise<Consultant | null> {
    return (this.asConsultant =
      (await loadNullableSingularRelation(this, 'asConsultant')) || null);
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  public get sortingKey(): string[] {
    return this.name.trim().split(/\s+/).reverse();
  }
}
