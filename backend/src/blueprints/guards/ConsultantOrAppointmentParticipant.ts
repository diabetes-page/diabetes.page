import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { findIndex } from 'lodash';
import { Appointment } from '../../domains/appointments/entities/Appointment.entity';
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

    const workingGroupId: string | undefined =
      request.params[this.workingGroupIdParam];
    const appointmentId: string | undefined =
      request.params[this.appointmentIdParam];

    if (!workingGroupId || !appointmentId) {
      return false;
    }

    const workingGroup = await WorkingGroup.findOne(workingGroupId, {
      relations: ['users'],
    });
    const appointment = await Appointment.findOne(appointmentId, {
      relations: ['workingGroups'],
    });

    if (!workingGroup || !appointment) {
      return false;
    }

    const appointmentInWorkingGroup =
      -1 !==
      findIndex(
        appointment.workingGroups,
        (appointmentGroup: WorkingGroup) =>
          appointmentGroup.id === workingGroup.id,
      );

    if (!appointmentInWorkingGroup) {
      return false;
    }

    if (await user.loadAsConsultant()) {
      return true;
    }

    const userInWorkingGroup =
      -1 !==
      findIndex(
        workingGroup.users,
        (groupUser: User) => groupUser.id === user.id,
      );

    return userInWorkingGroup;
  }
}
