import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Appointment } from '../entities/Appointment.entity';

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

  async add(startsAt: Date, endsAt: Date): Promise<Appointment> {
    return await this.appointmentsRepository.save(
      this.appointmentsRepository.create({
        startsAt,
        endsAt,
      }),
    );
  }
}
