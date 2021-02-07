import { BaseEntity } from 'typeorm';

export async function loadNullableSingularRelation<
  Input extends BaseEntity,
  Key extends keyof Input
>(
  entity: Input,
  relation: Key & string,
): Promise<Input[Key] | null | undefined> {
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

// Based on https://stackoverflow.com/questions/54520676/in-typescript-how-to-specify-only-keys-of-a-generic-object-whose-values-are-stri
type KeyMappingToArray<Obj> = {
  [K in keyof Obj]-?: Obj[K] extends any[] ? K : never;
}[keyof Obj];
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
