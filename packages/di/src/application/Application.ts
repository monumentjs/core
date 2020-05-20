import { Type } from '@monument/core';
import { ApplicationConfiguration } from './ApplicationConfiguration';
import { ApplicationMetadata } from './ApplicationMetadata';

export function Application(configuration: ApplicationConfiguration = {}): ClassDecorator {
  return target => {
    ApplicationMetadata.attach(target as unknown as Type, configuration);
  };
}
