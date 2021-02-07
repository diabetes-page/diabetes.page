import { Injectable } from '@nestjs/common';
import * as base64 from '@stablelib/base64';
import * as nacl from 'tweetnacl';
import { mapPromises } from '../../../utilities/promises';
import { User } from '../../users/entities/User.entity';
import { Appointment } from '../entities/Appointment.entity';
import { UserAppointmentAssignment } from '../entities/UserAppointmentAssignment.entity';

@Injectable()
export class AppointmentsService {
  async get(id: number): Promise<Appointment | undefined> {
    return Appointment.findOne({ where: { id } });
  }

  async getAppointmentsForUser(user: User): Promise<Appointment[]> {
    const appointmentAssignments = user.appointmentAssignments;
    const callbackFunction = async (
      appointmentAssignment: UserAppointmentAssignment,
    ): Promise<Appointment> => {
      return appointmentAssignment.appointment;
    };
    return mapPromises(appointmentAssignments, callbackFunction);
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
