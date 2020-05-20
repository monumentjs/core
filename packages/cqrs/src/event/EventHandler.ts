import { Type } from '@monument/core';
import { Event } from './Event';

export const EVENT_TYPE = Symbol();

export function EventHandler(type: Type<Event>): MethodDecorator {
  return (target: object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(EVENT_TYPE, type, target, propertyKey);
  };
}
