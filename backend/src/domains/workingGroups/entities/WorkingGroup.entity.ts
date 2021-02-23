import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserWorkingGroupAssignment } from './UserWorkingGroupAssignment.entity';
import { WorkingGroupAppointmentAssignment } from './WorkingGroupAppointmentAssignment.entity';

@Entity()
export class WorkingGroup extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(
    () => UserWorkingGroupAssignment,
    (assignment) => assignment.workingGroup,
  )
  userAssignments: UserWorkingGroupAssignment[];

  @OneToMany(
    () => WorkingGroupAppointmentAssignment,
    (assignment) => assignment.workingGroup,
  )
  appointmentAssignments: WorkingGroupAppointmentAssignment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
