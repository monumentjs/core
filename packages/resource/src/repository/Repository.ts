import { Type } from '@monument/core';
import { IResource } from '../resource/IResource';

export function Repository(type: Type<IResource>): ClassDecorator {
  return target => {
    Reflect.defineMetadata(Repository, type, target);
  };
}
