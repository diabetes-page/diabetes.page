import { Injectable } from '@nestjs/common';
import { flatten } from 'lodash';
import { mapPromises } from '../../../utilities/promises';
import { Training } from '../../trainings/entities/Training.entity';
import { Consultant } from '../../users/entities/Consultant.entity';
import { User } from '../../users/entities/User.entity';
import { WorkingGroup } from '../../workingGroups/entities/WorkingGroup.entity';
import { Appointment } from '../entities/Appointment.entity';
import { AppointmentInWorkingGroup } from '../types/AppointmentInWorkingGroup';

@Injectable()
export class AppointmentsService {
  async get(id: string): Promise<Appointment | undefined> {
    return Appointment.findOne({ where: { id } });
  }

  async forUser(user: User): Promise<AppointmentInWorkingGroup[]> {
    const groups = await user.loadWorkingGroups();

    const appointmentsDeep: AppointmentInWorkingGroup[][] = await mapPromises(
      groups,
      async (workingGroup: WorkingGroup) =>
        (await workingGroup.loadAppointments()).map((appointment) => ({
          workingGroup,
          appointment,
        })),
    );

    return flatten(appointmentsDeep);
  }

  async add(
    training: Training,
    presenter: Consultant,
    startsAt: Date,
    endsAt: Date,
  ): Promise<Appointment> {
    return await Appointment.create({
      training,
      presenter,
      startsAt,
      endsAt,
      slideIndex: 0,
      conferenceUpdateCounter: 0,
    }).save();
  }

  async start(appointment: Appointment): Promise<void> {
    return void (await Appointment.update(appointment.id, {
      isRunning: true,
    }));
  }
}
