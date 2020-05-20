import { Type } from '@monument/core';
import { ModuleConfiguration } from './ModuleConfiguration';
import { ModuleMetadata } from './ModuleMetadata';

export function Module(configuration: ModuleConfiguration): ClassDecorator {
  return target => {
    ModuleMetadata.attach(target as unknown as Type, configuration);
  };
}
