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
@Unique(['teachingBase', 'documentPath'])
@Unique(['teachingBase', 'name'])
export class TeachingBaseDocument extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => TeachingBase, (teachingBase) => teachingBase.documents, {
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

  @Column()
  documentPath: string;

  @OneToMany(() => Training, (training) => training.teachingBaseDocument)
  trainings: Training[];

  async loadTrainings(): Promise<Training[]> {
    return (this.trainings = await loadPluralRelation<
      TeachingBaseDocument,
      'trainings'
    >(this, 'trainings'));
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
