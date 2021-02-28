import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { User } from '../../domains/users/entities/User.entity';

@Injectable()
export class ConsultantOrTargetsSelf implements CanActivate {
  constructor(protected param: string) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    const isConsultant = !!(await user.loadAsConsultant());

    if (isConsultant) {
      return true;
    }

    return request.params[this.param] === user.id;
  }
}
