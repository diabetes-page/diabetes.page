import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from '../entities/Appointment.entity';
import * as nacl from 'tweetnacl';
import * as naclUtil from 'tweetnacl-util';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
  ) {}

  async get(id: number): Promise<Appointment | undefined> {
    return this.appointmentsRepository.findOne({ where: { id } });
  }

  async add(startsAt: Date, endsAt: Date): Promise<Appointment> {
    const { publicKey, secretKey } = nacl.sign.keyPair();

    return await this.appointmentsRepository.save(
      this.appointmentsRepository.create({
        startsAt,
        endsAt,
        officialMessagesPublicKey: naclUtil.encodeBase64(publicKey),
        officialMessagesPrivateKey: naclUtil.encodeBase64(secretKey),
      }),
    );
  }
}
