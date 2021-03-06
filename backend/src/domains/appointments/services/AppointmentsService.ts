import { Injectable } from '@nestjs/common';
import { getCustomRepository } from 'typeorm';
import { Training } from '../../trainings/entities/Training.entity';
import { Consultant } from '../../users/entities/Consultant.entity';
import { User } from '../../users/entities/User.entity';
import { WorkingGroup } from '../../workingGroups/entities/WorkingGroup.entity';
import { Appointment } from '../entities/Appointment.entity';
import { AppointmentsRepository } from '../repositories/AppointmentsRepository';

@Injectable()
export class AppointmentsService {
  async forParticipant(user: User): Promise<Appointment[]> {
    return getCustomRepository(
      AppointmentsRepository,
    ).getParticipantAppointments(user);
  }

  async forConsultant(consultant: Consultant): Promise<Appointment[]> {
    return getCustomRepository(
      AppointmentsRepository,
    ).getConsultantAppointments(consultant);
  }

  async add(
    presenter: Consultant,
    startsAt: Date,
    endsAt: Date,
    workingGroups: WorkingGroup[],
    training: Training | null,
  ): Promise<Appointment> {
    return await Appointment.create({
      presenter,
      startsAt,
      endsAt,
      workingGroups,
      training,
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
