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
import { Training } from '../../trainings/entities/Training.entity';
import { LearningBase } from './LearningBase.entity';

@Entity()
@Unique(['learningBase', 'name'])
export class Topic extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => LearningBase, (learningBase) => learningBase.topics, {
    nullable: false,
  })
  learningBase: LearningBase;

  @Column()
  name: string;

  @OneToMany(() => Training, (training) => training.topic)
  trainings: Training[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
