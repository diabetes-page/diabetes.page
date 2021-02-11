import {
  BadRequestException,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { BaseEntity } from 'typeorm';

@Injectable()
export class EntityById<T extends typeof BaseEntity> implements PipeTransform {
  constructor(protected entityClass: T, protected param: string) {}

  async transform(routeParams: Record<string, string>): Promise<any> {
    const id = parseInt(routeParams[this.param]);

    if (isNaN(id)) {
      throw new BadRequestException();
    }

    const entity = await this.entityClass.findOne(id);

    if (!entity) {
      throw new NotFoundException();
    }

    return entity;
  }
}
