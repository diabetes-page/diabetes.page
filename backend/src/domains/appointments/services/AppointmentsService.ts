import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Appointment } from '../entities/Appointment.entity';
import { User } from '../../users/entities/User.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
    private configService: ConfigService,
  ) {}

  async get(id: number): Promise<Appointment | undefined> {
    return this.appointmentsRepository.findOne({ where: { id } });
  }
}
