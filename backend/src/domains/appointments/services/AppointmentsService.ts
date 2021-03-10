import { Injectable } from '@nestjs/common';
import { getCustomRepository } from 'typeorm';
import { Training } from '../../trainings/entities/Training.entity';
import { Consultant } from '../../users/entities/Consultant.entity';
import { User } from '../../users/entities/User.entity';
import { Appointment } from '../entities/Appointment.entity';
import { AppointmentsRepository } from '../repositories/AppointmentsRepository';

@Injectable()
export class AppointmentsService {
  async get(appointmentId: string): Promise<Appointment | undefined> {
    return Appointment.findOne({ where: { id: appointmentId } });
  }

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
