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
import {
  loadNotNullSingularRelation,
  loadPluralRelation,
} from '../../../utilities/relations';
import { Appointment } from '../../appointments/entities/Appointment.entity';
import { TeachingBaseDocument } from '../../teachingBases/entities/TeachingBaseDocument.entity';
import { Topic } from '../../teachingBases/entities/Topic.entity';
import { Consultant } from '../../users/entities/Consultant.entity';

@Entity()
@Unique(['name', 'creator'])
export class Training extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'jsonb',
    array: false,
    nullable: false,
  })
  slides: number[];

  @ManyToOne(() => TeachingBaseDocument, (document) => document.trainings, {
    nullable: false,
  })
  teachingBaseDocument: TeachingBaseDocument;

  async loadTeachingBaseDocument(): Promise<TeachingBaseDocument> {
    return (this.teachingBaseDocument = await loadNotNullSingularRelation(
      this,
      'teachingBaseDocument',
    ));
  }

  @ManyToOne(() => Topic, (topic) => topic.trainings, {
    nullable: false,
  })
  topic: Topic;

  async loadTopic(): Promise<Topic> {
    return (this.topic = await loadNotNullSingularRelation(this, 'topic'));
  }

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
