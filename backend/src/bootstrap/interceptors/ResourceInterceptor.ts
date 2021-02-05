import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { classToPlain, plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResourceController } from '../../blueprints/controllers/ResourceController';

/**
 * This interceptor is used in order to extract only the fields that are to be exposed by a given resource.
 * It uses class-transformer in order to extract all values of the resource which are annotated with @Expose().
 * This is powerful because it allows us to specify default values to be exposed by entities, while enabling us to
 * extend these.
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
    const controllerClass: any = context.getClass();

    if (
      !ResourceController.isPrototypeOf(controllerClass) ||
      !controllerClass.Resource
    ) {
      throw new Error(
        'Every controller must extend ResourceController and declare Resource',
      );
    }

    return next
      .handle()
      .pipe(map((value) => this.mapResource(value, controllerClass)));
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/ban-types
  mapResource(value: any, controllerClass: any): Object {
    const asClass = plainToClass(controllerClass.Resource, value);

    return classToPlain(asClass, {
      strategy: 'excludeAll',
    });
  }
}
