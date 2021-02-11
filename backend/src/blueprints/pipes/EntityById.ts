import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { BaseEntity } from 'typeorm';

@Injectable()
export class EntityById<T extends typeof BaseEntity> implements PipeTransform {
  constructor(protected entityClass: T, protected key: string = 'id') {}

  async transform(routeParams: Record<string, string>): Promise<any> {
    const id = parseInt(routeParams[this.key]);
    const entity = await this.entityClass.findOne(id);

    if (!entity) {
      throw new NotFoundException();
    }

    return entity;
  }
}
