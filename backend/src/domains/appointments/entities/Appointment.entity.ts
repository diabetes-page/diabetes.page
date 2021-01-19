import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { User } from '../../users/entities/User.entity';
import { Client } from '../../clients/entities/Client.entity';
import { Consultant } from '../../users/entities/Consultant.entity';
import { CustomizedTraining } from '../../trainings/entities/CustomizedTraining.entity';
import { UserAppointmentAssignment } from './UserAppointmentAssignment.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @ManyToOne(
    () => CustomizedTraining,
    (customizedTraining) => customizedTraining.appointments,
    {
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      nullable: false,
    },
  )
  customizedTraining: CustomizedTraining;

  @OneToMany(
    () => UserAppointmentAssignment,
    (assignment) => assignment.appointment,
  )
  userAssignments: UserAppointmentAssignment[];

  @Column()
  startsAt: Date;

  @Column()
  endsAt: Date;

  @Column({ unique: true })
  @Generated('uuid')
  conferenceRoom: string;

  @Column()
  presentationIndex: number;

  @Column()
  conferenceUpdateCounter: number;

  @Column({ unique: true })
  officialMessagePublicKey: string;

  @Column({ unique: true })
  officialMessagePrivateKey: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
