import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { User } from '../../../users/entities/User.entity';
import { Appointment } from '../../entities/Appointment.entity';

@Injectable()
export class AppointmentPresenterGuard implements CanActivate {
  constructor(protected appointmentIdParam: string) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    const consultant = await user.loadAsConsultant();

    if (!consultant) {
      return false;
    }

    const appointment = await Appointment.findOne(
      request.params[this.appointmentIdParam],
      { relations: ['presenter'] },
    );

    return !!appointment && appointment.presenter.id === consultant.id;
  }
}
