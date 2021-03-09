import { WorkingGroup } from '../../workingGroups/entities/WorkingGroup.entity';
import { Appointment } from '../entities/Appointment.entity';

export type AppointmentInWorkingGroup = {
  appointment: Appointment;
  workingGroup: WorkingGroup;
};
