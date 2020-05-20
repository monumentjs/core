import { Type } from '@monument/core';
import { Key } from '@monument/collections';
import { Class } from '@monument/reflect';
import { MetadataException } from '../exception/MetadataException';
import { ModuleConfiguration } from './ModuleConfiguration';
import { ProviderConfiguration } from '../provider/ProviderConfiguration';

export class ModuleMetadata {
  private static KEY = new Key<ModuleMetadata>();

  static attach(type: Type, configuration: ModuleConfiguration): void {
    const klass = Class.of(type);

    if (klass.metadata.attributes.has(this.KEY)) {
      throw new MetadataException(`Class ${type.name} is already decorated with @Module`);
    }

    klass.metadata.attributes.set(this.KEY, new ModuleMetadata(configuration));
  }

  static resolve(type: Type): ModuleMetadata | never {
    const klass = Class.of(type);
    const metadata = klass.metadata.attributes.get(this.KEY);

    if (!metadata) {
      throw new MetadataException(`Module metadata of ${type.name} is not found. Have you added @Module decorator?`);
    }

    return metadata;
  }

  readonly providers: ReadonlyArray<ProviderConfiguration>;
  readonly dependencies: ReadonlyArray<Type>;
  readonly exports: ReadonlyArray<Type>;

  private constructor({ providers, imports = [], exports = [] }: ModuleConfiguration) {
    this.dependencies = imports;
    this.providers = providers.map(provider => typeof provider === 'function' ? { provide: provider, useClass: provider } : provider);
    this.exports = exports;
  }
}
