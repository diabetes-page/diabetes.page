import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { INSECURE_ROUTE_METADATA_KEY } from '../decorators/InsecureRoute';

/* This automatically makes use of the JWTStrategy defined somewhere else */
@Injectable()
export class JWTAuth extends AuthGuard('JWT') {
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
