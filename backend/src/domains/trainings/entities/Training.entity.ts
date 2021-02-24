import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { loadPluralRelation } from '../../../utilities/relations';
import { Appointment } from '../../appointments/entities/Appointment.entity';
import { Topic } from '../../teachingBases/entities/Topic.entity';
import { Consultant } from '../../users/entities/Consultant.entity';

@Entity()
@Unique(['name', 'creator'])
export class Training extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'jsonb',
    array: false,
    nullable: false,
  })
  slides: number[];

  @ManyToOne(() => Topic, (topic) => topic.trainings, {
    nullable: false,
  })
  topic: Topic;

  @ManyToOne(() => Consultant, (consultant) => consultant.trainings, {
    nullable: false,
  })
  creator: Consultant;

  @OneToMany(() => Appointment, (appointment) => appointment.training)
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
