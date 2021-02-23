import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { loadNotNullSingularRelation } from '../../../utilities/relations';
import { Appointment } from '../../appointments/entities/Appointment.entity';
import { WorkingGroup } from './WorkingGroup.entity';

@Entity()
@Unique(['workingGroup', 'appointment'])
export class WorkingGroupAppointmentAssignment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => Appointment,
    (appointment) => appointment.workingGroupAssignments,
    {
      nullable: false,
    },
  )
  appointment: Appointment;

  async loadAppointment(): Promise<Appointment> {
    return (this.appointment = await loadNotNullSingularRelation(
      this,
      'appointment',
    ));
  }

  @ManyToOne(
    () => WorkingGroup,
    (workingGroup) => workingGroup.appointmentAssignments,
    {
      nullable: false,
    },
  )
  workingGroup: WorkingGroup;

  async loadWorkingGroup(): Promise<WorkingGroup> {
    return (this.workingGroup = await loadNotNullSingularRelation(
      this,
      'workingGroup',
    ));
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
