import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Training } from '../../trainings/entities/Training.entity';
import { Consultant } from '../../users/entities/Consultant.entity';
import { UserAppointmentAssignment } from './UserAppointmentAssignment.entity';

@Entity()
export class Appointment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Training, (training) => training.appointments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  trainings: Training | null;

  @ManyToOne(() => Consultant, (consultant) => consultant.trainings, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  presenter: Consultant;

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

  @OneToMany(
    () => UserAppointmentAssignment,
    (assignment) => assignment.appointment,
    { cascade: true },
  )
  userAssignments: UserAppointmentAssignment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
