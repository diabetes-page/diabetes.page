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
import { Training } from '../../trainings/entities/Training.entity';
import { TeachingBase } from './TeachingBase.entity';

@Entity()
@Unique(['teachingBase', 'name'])
export class Topic extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TeachingBase, (teachingBase) => teachingBase.topics, {
    nullable: false,
  })
  teachingBase: TeachingBase;

  async loadTeachingBase(): Promise<TeachingBase> {
    return (this.teachingBase = await loadNotNullSingularRelation(
      this,
      'teachingBase',
    ));
  }

  @Column()
  name: string;

  @OneToMany(() => Training, (training) => training.topic)
  trainings: Training[];

  async loadTrainings(): Promise<Training[]> {
    return (this.trainings = await loadPluralRelation<Topic, 'trainings'>(
      this,
      'trainings',
    ));
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
