import { Type } from '@monument/core';
import { ExtensionInterface } from '../extension/ExtensionInterface';
import { ProviderConfiguration } from '../provider/ProviderConfiguration';

export interface ApplicationConfiguration {
  imports?: Array<Type>;
  extensions?: Array<Type<ExtensionInterface> | ProviderConfiguration<ExtensionInterface>>;
  providers?: Array<Type | ProviderConfiguration>;
}
