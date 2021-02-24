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
