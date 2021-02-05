import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Appointment } from '../../appointments/entities/Appointment.entity';
import { Training } from '../../trainings/entities/Training.entity';
import { Manager } from './Manager.entity';
import { User } from './User.entity';

@Entity()
export class Consultant extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
    eager: true,
  })
  @JoinColumn()
  user: User;

  @OneToMany(() => Training, (training) => training.creator, { cascade: true })
  trainings: Training[];

  @OneToMany(() => Appointment, (appointment) => appointment.presenter, {
    cascade: true,
  })
  appointments: Appointment[];

  @OneToOne(() => Manager, { cascade: true })
  asManager: Manager | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
