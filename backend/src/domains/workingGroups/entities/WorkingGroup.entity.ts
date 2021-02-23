import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { loadPluralRelation } from '../../../utilities/relations';
import { Appointment } from '../../appointments/entities/Appointment.entity';
import { Consultant } from '../../users/entities/Consultant.entity';
import { User } from '../../users/entities/User.entity';

@Entity()
@Unique(['name', 'creator'])
export class WorkingGroup extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Consultant, (consultant) => consultant.workingGroups, {
    nullable: false,
  })
  creator: Consultant;

  // todo: set ON UPDATE CASCADE in SQL, see https://github.com/typeorm/typeorm/issues/4980
  @ManyToMany(() => User, (user) => user.workingGroups, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  users: User[];

  async loadUsers(): Promise<User[]> {
    return (this.users = await loadPluralRelation<WorkingGroup, 'users'>(
      this,
      'users',
    ));
  }

  @ManyToMany(() => Appointment, (appointment) => appointment.workingGroups, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
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
