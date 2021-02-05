import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { User } from '../../domains/users/entities/User.entity';

@Injectable()
export class ConsultantGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    return !!user.asConsultant;
  }
}
