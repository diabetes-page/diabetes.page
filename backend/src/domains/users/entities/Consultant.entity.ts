import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  loadNotNullSingularRelation,
  loadNullableSingularRelation,
  loadPluralRelation,
} from '../../../utilities/relations';
import { Appointment } from '../../appointments/entities/Appointment.entity';
import { Training } from '../../trainings/entities/Training.entity';
import { WorkingGroup } from '../../workingGroups/entities/WorkingGroup.entity';
import { Manager } from './Manager.entity';
import { User } from './User.entity';

@Entity()
export class Consultant extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, {
    nullable: false,
  })
  @JoinColumn()
  user: User;

  async loadUser(): Promise<User> {
    return (this.user = await loadNotNullSingularRelation(this, 'user'));
  }

  @OneToMany(() => WorkingGroup, (workingGroup) => workingGroup.creator)
  workingGroups: WorkingGroup[];

  @OneToMany(() => Training, (training) => training.creator)
  trainings: Training[];

  @OneToMany(() => Appointment, (appointment) => appointment.presenter)
  appointments: Appointment[];

  async loadAppointments(): Promise<Appointment[]> {
    return (this.appointments = await loadPluralRelation<
      Consultant,
      'appointments'
    >(this, 'appointments'));
  }

  @OneToOne(() => Manager, (manager) => manager.consultant)
  asManager: Manager | null;

  async loadAsManager(): Promise<Manager | null> {
    return (this.asManager =
      (await loadNullableSingularRelation(this, 'asManager')) || null);
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
