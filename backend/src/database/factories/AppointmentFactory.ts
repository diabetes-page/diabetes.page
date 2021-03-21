import { Injectable } from '@nestjs/common';
import { addDays, addHours, subDays } from 'date-fns';
import * as Faker from 'faker';
import { Appointment } from '../../domains/appointments/entities/Appointment.entity';
import { Training } from '../../domains/trainings/entities/Training.entity';
import { Consultant } from '../../domains/users/entities/Consultant.entity';

@Injectable()
export class AppointmentFactory {
  public createAppointment = async (
    training: Training,
    presenter: Consultant,
    props: Partial<Appointment> = {},
  ): Promise<Appointment> => {
    const startsAt = Faker.date.between(
      subDays(new Date(), 3),
      addDays(new Date(), 3),
    );
    const endsAt = addHours(startsAt, 8);

    return Appointment.create({
      training,
      presenter,
      startsAt,
      endsAt,
      slideIndex: 0,
      conferenceUpdateCounter: 0,
      ...props,
    }).save();
  };
}
