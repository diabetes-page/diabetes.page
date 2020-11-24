import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { INSECURE_ROUTE_METADATA_KEY } from '../../../bootstrap/blueprints/decorators/InsecureRoute';
import { Observable } from 'rxjs';

@Injectable()
export class JWTAuthGuard extends AuthGuard('JWT') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isInsecureRoute = this.reflector.getAllAndOverride<boolean>(
      INSECURE_ROUTE_METADATA_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (isInsecureRoute) {
      return true;
    }
    return super.canActivate(context);
  }
}
