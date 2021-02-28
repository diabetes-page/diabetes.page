import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { BaseEntity } from 'typeorm';

@Injectable()
export class EntityById<T extends typeof BaseEntity> implements PipeTransform {
  constructor(protected entityClass: T, protected param: string) {}

  async transform(routeParams: Record<string, string>): Promise<any> {
    const id = routeParams[this.param];
    const entity = await this.entityClass.findOne(id);

    if (!entity) {
      throw new NotFoundException(); // todo: add error message
    }

    return entity;
  }
}
