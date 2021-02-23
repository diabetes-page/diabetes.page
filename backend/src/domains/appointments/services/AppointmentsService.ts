import { Injectable } from '@nestjs/common';
import { mapPromises } from '../../../utilities/promises';
import { User } from '../../users/entities/User.entity';
import { Appointment } from '../entities/Appointment.entity';
import { UserAppointmentAssignment } from '../entities/UserAppointmentAssignment.entity';

@Injectable()
export class AppointmentsService {
  async get(id: number): Promise<Appointment | undefined> {
    return Appointment.findOne({ where: { id } });
  }

  async forUser(user: User): Promise<Appointment[]> {
    const appointmentAssignments = await user.loadAppointmentAssignments();

    return mapPromises(
      appointmentAssignments,
      async (assignment: UserAppointmentAssignment) =>
        assignment.loadAppointment(),
    );
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
