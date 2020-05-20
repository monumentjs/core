import { Type } from '@monument/core';
import { Query } from './Query';

export const QUERY_TYPE = Symbol();

export function QueryHandler(type: Type<Query>): MethodDecorator {
  return (target: object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(QUERY_TYPE, type, target, propertyKey);
  };
}
