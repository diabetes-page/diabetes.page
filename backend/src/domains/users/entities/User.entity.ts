import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  loadNullableSingularRelation,
  loadPluralRelation,
} from '../../../utilities/relations';
import { WorkingGroup } from '../../workingGroups/entities/WorkingGroup.entity';
import { Consultant } from './Consultant.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ type: 'character varying', nullable: true })
  password: string | null;

  @Column({ type: 'character varying', nullable: true })
  verificationToken: string | null;

  // todo: set ON UPDATE CASCADE in SQL, see https://github.com/typeorm/typeorm/issues/4980
  @ManyToMany(() => WorkingGroup, (workingGroup) => workingGroup.users, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  workingGroups: WorkingGroup[];

  async loadWorkingGroups(): Promise<WorkingGroup[]> {
    return (this.workingGroups = await loadPluralRelation<
      User,
      'workingGroups'
    >(this, 'workingGroups'));
  }

  @OneToOne(() => Consultant, (consultant) => consultant.user)
  asConsultant: Consultant | null;

  async loadAsConsultant(): Promise<Consultant | null> {
    return (this.asConsultant =
      (await loadNullableSingularRelation(this, 'asConsultant')) || null);
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  public get sortingKey(): string[] {
    return this.name.trim().split(/\s+/).reverse();
  }
}
