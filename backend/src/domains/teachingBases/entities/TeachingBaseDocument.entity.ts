import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { TeachingBase } from './TeachingBase.entity';

@Entity()
@Unique(['teachingBase', 'documentPath'])
@Unique(['teachingBase', 'name'])
export class TeachingBaseDocument extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TeachingBase, (teachingBase) => teachingBase.documents, {
    nullable: false,
  })
  teachingBase: TeachingBase;

  @Column()
  name: string;

  @Column()
  documentPath: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
