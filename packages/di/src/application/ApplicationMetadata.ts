import { Type } from '@monument/core';
import { Key } from '@monument/collections';
import { Class } from '@monument/reflect';
import { MetadataException } from '../exception/MetadataException';
import { ApplicationConfiguration } from './ApplicationConfiguration';
import { ExtensionInterface } from '../extension/ExtensionInterface';
import { ProviderConfiguration } from '../provider/ProviderConfiguration';

export class ApplicationMetadata {
  private static KEY = new Key<ApplicationMetadata>();

  static attach(type: Type, configuration: ApplicationConfiguration): void {
    const klass = Class.of(type);

    if (klass.metadata.attributes.has(this.KEY)) {
      throw new MetadataException(`Class ${type.name} is already decorated with @Application`);
    }

    klass.metadata.attributes.set(this.KEY, new ApplicationMetadata(configuration));
  }

  static resolve(type: Type): ApplicationMetadata | never {
    const klass = Class.of(type);
    const metadata = klass.metadata.attributes.get(this.KEY);

    if (!metadata) {
      throw new MetadataException(`Application metadata of ${type.name} is not found. Have you added @Application decorator?`);
    }

    return metadata;
  }

  readonly dependencies: ReadonlyArray<Type>;
  readonly extensions: ReadonlyArray<ProviderConfiguration<ExtensionInterface>>;
  readonly providers: ReadonlyArray<ProviderConfiguration>;

  private constructor({ imports = [], extensions = [], providers = [] }: ApplicationConfiguration) {
    this.dependencies = imports;
    this.providers = providers.map(provider => typeof provider === 'function' ? { provide: provider, useClass: provider } : provider);
    this.extensions = extensions.map(provider => typeof provider === 'function' ? { provide: provider, useClass: provider } : provider);
  }
}
