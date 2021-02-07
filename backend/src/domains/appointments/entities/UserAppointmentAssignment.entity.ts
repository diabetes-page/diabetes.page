import {
  BaseEntity,
  Column,
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
import { Appointment } from './Appointment.entity';

@Entity()
@Unique(['appointment', 'user'])
export class UserAppointmentAssignment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Appointment, (appointment) => appointment.userAssignments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  appointment: Appointment;

  async loadAppointment(): Promise<Appointment> {
    return (this.appointment = await loadNotNullSingularRelation(
      this,
      'appointment',
    ));
  }

  @ManyToOne(() => User, (user) => user.appointmentAssignments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  user: User;

  async loadUser(): Promise<User> {
    return (this.user = await loadNotNullSingularRelation(this, 'user'));
  }

  @Column({ default: false })
  hasAttended: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
