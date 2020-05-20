import { Type } from '@monument/core';
import { ProviderConfiguration } from '../provider/ProviderConfiguration';

export interface InjectableConfiguration {
  readonly singleton?: boolean;
  readonly providers?: Array<Type | ProviderConfiguration>;
}
