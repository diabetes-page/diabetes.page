import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { User } from '../../domains/users/entities/User.entity';

@Injectable()
export class ConsultantOrTargetsSelfGuard implements CanActivate {
  constructor(protected key: string) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    const isConsultant = !!(await user.loadAsConsultant());

    if (isConsultant) {
      return true;
    }

    return parseInt(request.params[this.key]) === user.id;
  }
}
