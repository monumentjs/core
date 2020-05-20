import { Type } from '@monument/core';
import { Key } from '@monument/collections';
import { Class } from '@monument/reflect';
import { MetadataException } from '../exception/MetadataException';
import { ProviderConfiguration } from '../provider/ProviderConfiguration';
import { InjectableConfiguration } from './InjectableConfiguration';

export class InjectableMetadata {
  private static KEY = new Key<InjectableMetadata>();

  static attach(type: Type, configuration: InjectableConfiguration): void {
    const klass = Class.of(type);

    if (klass.metadata.attributes.has(this.KEY)) {
      throw new MetadataException(`Class ${type.name} is already decorated with @Injectable`);
    }

    klass.metadata.attributes.set(this.KEY, new InjectableMetadata(configuration));
  }

  static resolve(type: Type): InjectableMetadata | never {
    const klass = Class.of(type);
    const metadata = klass.metadata.attributes.get(this.KEY);

    if (!metadata) {
      throw new MetadataException(`Injectable metadata of ${type.name} is not found. Have you added @Injectable decorator?`);
    }

    return metadata;
  }

  readonly singleton: boolean;
  readonly providers: Array<ProviderConfiguration>;

  private constructor({ providers = [], singleton = true }: InjectableConfiguration) {
    this.singleton = singleton;
    this.providers = providers.map(provider => typeof provider === 'function' ? { provide: provider, useClass: provider } : provider);
  }
}
