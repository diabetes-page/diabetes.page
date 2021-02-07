import { Injectable } from '@nestjs/common';
import * as base64 from '@stablelib/base64';
import * as nacl from 'tweetnacl';
import { User } from '../../users/entities/User.entity';
import { Appointment } from '../entities/Appointment.entity';

@Injectable()
export class AppointmentsService {
  async get(id: number): Promise<Appointment | undefined> {
    return Appointment.findOne({ where: { id } });
  }

  async getAppointmentsForUser(user: User): Promise<Appointment[]> {
    return user.appointmentAssignments.map((appAss) => {
      return appAss.appointment;
    });
  }

  async add(startsAt: Date, endsAt: Date): Promise<Appointment> {
    const { publicKey, secretKey } = nacl.sign.keyPair();

    return await Appointment.create({
      presentationIndex: 0,
      conferenceUpdateCounter: 0,
      startsAt,
      endsAt,
      officialMessagePublicKey: base64.encode(publicKey),
      officialMessagePrivateKey: base64.encode(secretKey),
    }).save();
  }
}
