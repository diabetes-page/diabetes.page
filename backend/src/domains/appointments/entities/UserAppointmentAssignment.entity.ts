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
import { Expose } from 'class-transformer';
import { Appointment } from './Appointment.entity';
import { User } from '../../users/entities/User.entity';

@Entity()
@Unique(['appointment', 'user'])
export class UserAppointmentAssignment extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @ManyToOne(() => Appointment, (appointment) => appointment.userAssignments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  appointment: Appointment;

  @ManyToOne(() => User, (user) => user.appointmentAssignments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  user: User;

  @Column({ default: false })
  hasAttended: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
