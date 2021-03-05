import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Appointment } from '../../domains/appointments/entities/Appointment.entity';
import { User } from '../../domains/users/entities/User.entity';

@Injectable()
export class ConsultantOrAppointmentParticipant implements CanActivate {
  constructor(protected appointmentIdParam: string) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    const isConsultant = !!(await user.loadAsConsultant());

    const query = Appointment.createQueryBuilder('appointment')
      .select('appointment.id')
      .where('appointment.id = :appointmentId', {
        appointmentId: request.params[this.appointmentIdParam],
      });

    if (!isConsultant) {
      query
        .innerJoin('appointment.workingGroups', 'workingGroup')
        .innerJoin('workingGroup.users', 'user')
        .andWhere('user.id = :userId', {
          userId: user.id,
        });
    }

    return !!(await query.getOne());
  }
}
