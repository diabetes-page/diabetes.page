import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { classToPlain, plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';

export class ResourceType {}

export class HandlerType {
  public static Resource = ResourceType;
}

/**
 * This interceptor is used in order to extract only the fields that are to be exposed by a given resource.
 * It uses class-transformer in order to extract all values of the resource which are annotated with @Expose().
 * This is powerful because it allows us to specify default values to be exposed by entities, while enabling us to
 * extent these.
 *
 * In order for this transformation to work, the input object must actually be an instance of the resource class, and
 * not just some object. Because of this, the object is first transformed to an instance of the resource class using
 * plainToClass, and then the instance is transformed back to an object using classToPlain.
 *
 * In order for us to know into which resource class instance we should transform the object, the Resource static
 * property must be set.
 */
@Injectable()
export class ResourceInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const controllerClass = context.getClass();

    if (!HandlerType.isPrototypeOf(controllerClass)) {
      throw new InternalServerErrorException(
        'Every handler must extend HandlerType and declare Resource',
      );
    }

    return next
      .handle()
      .pipe(map(value => this.mapResource(value, controllerClass)));
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/ban-types
  mapResource<T>(value: any, controllerClass: any): Object {
    const asClass = plainToClass(controllerClass.Resource, value);

    const asPlain = classToPlain(asClass, {
      strategy: 'excludeAll',
    });

    return asPlain;
  }
}
