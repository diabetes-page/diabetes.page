import { Injectable } from '@nestjs/common';
import { flatten, uniqBy } from 'lodash';
import { mapPromises } from '../../../utilities/promises';
import { User } from '../../users/entities/User.entity';
import { WorkingGroup } from '../../workingGroups/entities/WorkingGroup.entity';
import { Appointment } from '../entities/Appointment.entity';

@Injectable()
export class AppointmentsService {
  async get(id: number): Promise<Appointment | undefined> {
    return Appointment.findOne({ where: { id } });
  }

  async forUser(user: User): Promise<Appointment[]> {
    const groups = await user.loadWorkingGroups();

    const appointmentsDeep = await mapPromises(
      groups,
      async (group: WorkingGroup) => group.loadAppointments(),
    );
    const appointmentsFlat = flatten(appointmentsDeep);

    return uniqBy(appointmentsFlat, 'id');
  }

  async add(startsAt: Date, endsAt: Date): Promise<Appointment> {
    return await Appointment.create({
      presentationIndex: 0,
      conferenceUpdateCounter: 0,
      startsAt,
      endsAt,
    }).save();
  }
}
