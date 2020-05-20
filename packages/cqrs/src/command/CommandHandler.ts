import { Type } from '@monument/core';
import { Command } from './Command';

export const COMMAND_TYPE = Symbol();

export function CommandHandler(type: Type<Command>): ClassDecorator {
  return (target: Function) => {
    Reflect.defineMetadata(COMMAND_TYPE, type, target);
  };
}
