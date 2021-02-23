import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  loadNotNullSingularRelation,
  loadNullableSingularRelation,
} from '../../../utilities/relations';
import { Training } from '../../trainings/entities/Training.entity';
import { Consultant } from '../../users/entities/Consultant.entity';
import { WorkingGroupAppointmentAssignment } from '../../workingGroups/entities/WorkingGroupAppointmentAssignment.entity';

@Entity()
export class Appointment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Training, (training) => training.appointments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  training: Training | null;

  async loadTraining(): Promise<Training | null> {
    return (this.training =
      (await loadNullableSingularRelation(this, 'training')) || null);
  }

  @ManyToOne(() => Consultant, (consultant) => consultant.trainings, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
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
  presentationIndex: number;

  @Column()
  conferenceUpdateCounter: number;

  @OneToMany(
    () => WorkingGroupAppointmentAssignment,
    (assignment) => assignment.appointment,
  )
  workingGroupAssignments: WorkingGroupAppointmentAssignment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
