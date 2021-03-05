import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { User } from '../../domains/users/entities/User.entity';
import { WorkingGroup } from '../../domains/workingGroups/entities/WorkingGroup.entity';

@Injectable()
export class ConsultantOrAppointmentParticipant implements CanActivate {
  constructor(
    protected workingGroupIdParam: string,
    protected appointmentIdParam: string,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    const isConsultant = !!(await user.loadAsConsultant());

    const query = WorkingGroup.createQueryBuilder('workingGroup')
      .select('workingGroup.id')
      .innerJoin('workingGroup.appointments', 'appointment')
      .where('workingGroup.id = :workingGroupId', {
        workingGroupId: request.params[this.workingGroupIdParam],
      })
      .andWhere('appointment.id = :appointmentId', {
        appointmentId: request.params[this.appointmentIdParam],
      });

    if (!isConsultant) {
      query
        .innerJoin('workingGroup.users', 'user')
        .andWhere('user.id = :userId', {
          userId: user.id,
        });
    }

    return !!(await query.getOne());
  }
}
