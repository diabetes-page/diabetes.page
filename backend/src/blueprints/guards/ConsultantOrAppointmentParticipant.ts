import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { getCustomRepository } from 'typeorm';
import { AppointmentsRepository } from '../../domains/appointments/repositories/AppointmentsRepository';
import { User } from '../../domains/users/entities/User.entity';

@Injectable()
export class ConsultantOrAppointmentParticipant implements CanActivate {
  constructor(protected appointmentIdParam: string) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    return getCustomRepository(AppointmentsRepository).canUserSee(
      user,
      request.params[this.appointmentIdParam],
    );
  }
}
