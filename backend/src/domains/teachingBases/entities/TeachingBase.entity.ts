import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TeachingBaseDocument } from './TeachingBaseDocument.entity';
import { Topic } from './Topic.entity';

@Entity()
export class TeachingBase extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Topic, (topic) => topic.teachingBase)
  topics: Topic[];

  @OneToMany(() => TeachingBaseDocument, (document) => document.teachingBase)
  documents: TeachingBaseDocument[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
