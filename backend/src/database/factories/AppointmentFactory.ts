import { Injectable } from '@nestjs/common';
import * as base64 from '@stablelib/base64';
import { addDays, subDays } from 'date-fns';
import * as Faker from 'faker';
import * as nacl from 'tweetnacl';
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
    const endsAt = addDays(startsAt, 1);
    const { publicKey, secretKey } = nacl.sign.keyPair();

    return Appointment.create({
      training,
      presenter,
      startsAt,
      endsAt,
      presentationIndex: 0,
      conferenceUpdateCounter: 0,
      officialMessagePublicKey: base64.encode(publicKey),
      officialMessagePrivateKey: base64.encode(secretKey),
      ...props,
    }).save();
  };
}
