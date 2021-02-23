import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { loadPluralRelation } from '../../../utilities/relations';
import { Appointment } from '../../appointments/entities/Appointment.entity';
import { User } from '../../users/entities/User.entity';

@Entity()
export class WorkingGroup extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => User, (user) => user.workingGroups)
  @JoinTable()
  users: User[];

  async loadUsers(): Promise<User[]> {
    return (this.users = await loadPluralRelation<WorkingGroup, 'users'>(
      this,
      'users',
    ));
  }

  @ManyToMany(() => Appointment, (appointment) => appointment.workingGroups)
  @JoinTable()
  appointments: Appointment[];

  async loadAppointments(): Promise<Appointment[]> {
    return (this.appointments = await loadPluralRelation<
      WorkingGroup,
      'appointments'
    >(this, 'appointments'));
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
