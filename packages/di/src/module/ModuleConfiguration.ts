import { Type } from '@monument/core';
import { ProviderConfiguration } from '../provider/ProviderConfiguration';

export interface ModuleConfiguration {
  imports?: Array<Type>;
  providers: Array<Type | ProviderConfiguration>;
  exports?: Array<Type>;
}
