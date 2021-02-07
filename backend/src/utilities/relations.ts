import { BaseEntity } from 'typeorm';

export async function loadNullableSingularRelation<
  Input extends BaseEntity,
  Key extends keyof Input
>(entity: Input, relation: Key & string): Promise<Input[Key] | undefined> {
  const entityClass = entity.constructor as typeof BaseEntity;

  return await entityClass
    .getRepository()
    .createQueryBuilder()
    .relation(entityClass, relation)
    .of(entity)
    .loadOne();
}

export async function loadNotNullSingularRelation<
  Input extends BaseEntity,
  Key extends keyof Input
>(entity: Input, relation: Key & string): Promise<Input[Key]> {
  const entityClass = entity.constructor as typeof BaseEntity;

  return (await entityClass
    .getRepository()
    .createQueryBuilder()
    .relation(entityClass, relation)
    .of(entity)
    .loadOne())!;
}

type KeyMappingToArray<T> = {
  [K in keyof T]-?: T[K] extends any[] ? K : never;
}[keyof T];
export async function loadPluralRelation<
  Input extends BaseEntity,
  Key extends KeyMappingToArray<Input>
>(entity: Input, relation: Key & string): Promise<Input[Key]> {
  const entityClass = entity.constructor as typeof BaseEntity;

  return (await entityClass
    .getRepository()
    .createQueryBuilder()
    .relation(entityClass, relation)
    .of(entity)
    .loadMany()) as Input[Key];
}
