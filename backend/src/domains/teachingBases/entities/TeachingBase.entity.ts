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
import { loadPluralRelation } from '../../../utilities/relations';
import { TeachingBaseDocument } from './TeachingBaseDocument.entity';
import { Topic } from './Topic.entity';

@Entity()
export class TeachingBase extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Topic, (topic) => topic.teachingBase)
  topics: Topic[];

  async loadTopics(): Promise<Topic[]> {
    return (this.topics = await loadPluralRelation<TeachingBase, 'topics'>(
      this,
      'topics',
    ));
  }

  @OneToMany(() => TeachingBaseDocument, (document) => document.teachingBase)
  documents: TeachingBaseDocument[];

  async loadDocuments(): Promise<TeachingBaseDocument[]> {
    return (this.documents = await loadPluralRelation<
      TeachingBase,
      'documents'
    >(this, 'documents'));
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
