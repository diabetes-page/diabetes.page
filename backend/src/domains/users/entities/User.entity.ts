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

  async loadAppointmentAssignments(): Promise<UserAppointmentAssignment[]> {
    return (this.appointmentAssignments = await loadPluralRelation<
      User,
      'appointmentAssignments'
    >(this, 'appointmentAssignments'));
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
