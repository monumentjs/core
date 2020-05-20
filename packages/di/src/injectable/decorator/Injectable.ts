import { Type } from '@monument/core';
import { InjectableConfiguration } from '../InjectableConfiguration';
import { InjectableMetadata } from '../InjectableMetadata';

export function Injectable(configuration: InjectableConfiguration = {}): ClassDecorator {
  return target => {
    InjectableMetadata.attach(target as unknown as Type, configuration);
  };
}
