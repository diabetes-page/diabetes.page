import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  loadNotNullSingularRelation,
  loadNullableSingularRelation,
  loadPluralRelation,
} from '../../../utilities/relations';
import { Training } from '../../trainings/entities/Training.entity';
import { Consultant } from '../../users/entities/Consultant.entity';
import { WorkingGroup } from '../../workingGroups/entities/WorkingGroup.entity';

@Entity()
export class Appointment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Training, (training) => training.appointments, {
    nullable: true,
  })
  training: Training | null;

  async loadTraining(): Promise<Training | null> {
    return (this.training =
      (await loadNullableSingularRelation(this, 'training')) || null);
  }

  @ManyToOne(() => Consultant, (consultant) => consultant.trainings, {
    nullable: false,
  })
  presenter: Consultant;

  // Todo: Don't load again if it is already set, unless refresh parameter is provided
  async loadPresenter(): Promise<Consultant> {
    return (this.presenter = await loadNotNullSingularRelation(
      this,
      'presenter',
    ));
  }

  @Column()
  startsAt: Date;

  @Column()
  endsAt: Date;

  @Column({ unique: true })
  @Generated('uuid')
  conferenceRoom: string;

  @Column()
  slideIndex: number;

  @Column()
  conferenceUpdateCounter: number;

  @ManyToMany(() => WorkingGroup, (workingGroup) => workingGroup.appointments, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  workingGroups: WorkingGroup[];

  async loadWorkingGroups(): Promise<WorkingGroup[]> {
    return (this.workingGroups = await loadPluralRelation<
      Appointment,
      'workingGroups'
    >(this, 'workingGroups'));
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
