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
import { UserAppointmentAssignment } from '../../appointments/entities/UserAppointmentAssignment.entity';
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

  @OneToMany(() => UserAppointmentAssignment, (assignment) => assignment.user, {
    cascade: true,
  })
  appointmentAssignments: UserAppointmentAssignment[];

  get appointmentAssignmentsRelation(): Promise<UserAppointmentAssignment[]> {
    return loadPluralRelation<User, 'appointmentAssignments'>(
      this,
      'appointmentAssignments',
    );
  }

  @OneToOne(() => Consultant, (consultant) => consultant.user, {
    cascade: true,
  })
  asConsultant: Consultant | null;
  get asConsultantRelation(): Promise<Consultant | null | undefined> {
    return loadNullableSingularRelation(this, 'asConsultant');
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
