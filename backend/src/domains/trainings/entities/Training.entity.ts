import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { loadPluralRelation } from '../../../utilities/relations';
import { Appointment } from '../../appointments/entities/Appointment.entity';
import { Topic } from '../../learningBases/entities/Topic.entity';
import { Consultant } from '../../users/entities/Consultant.entity';

@Entity()
export class Training extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Topic, (topic) => topic.trainings, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  topic: Topic;

  @ManyToOne(() => Consultant, (consultant) => consultant.trainings, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  creator: Consultant;

  @OneToMany(() => Appointment, (appointment) => appointment.training, {
    cascade: true,
  })
  appointments: Appointment[];

  async loadAppointments(): Promise<Appointment[]> {
    return (this.appointments = await loadPluralRelation<
      Training,
      'appointments'
    >(this, 'appointments'));
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
