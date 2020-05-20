import { Type } from '@monument/core';
import { ApplicationInterface } from '../application/ApplicationInterface';
import { ApplicationMetadata } from '../application/ApplicationMetadata';
import { ExtensionInterface } from '../extension/ExtensionInterface';
import { ModuleMetadata } from '../module/ModuleMetadata';
import { ProviderConfiguration } from '../provider/ProviderConfiguration';

export interface ContextSchemaVisitor {
  application(schema: ApplicationContextSchema): void;

  module(schema: ModuleContextSchema): void;
}

export interface ContextSchema {
  readonly source: Type;
  readonly parent?: ContextSchema;
  readonly dependencies: ReadonlyArray<ContextSchema>;
  readonly providers: ReadonlyArray<ProviderConfiguration>;
  readonly exports: ReadonlyArray<Type>;
  readonly extensions: ReadonlyArray<Type<ExtensionInterface>>;

  accept(visitor: ContextSchemaVisitor): void;
}

export class ApplicationContextSchema implements ContextSchema, Iterable<ContextSchema> {
  private readonly schemas: Map<Type, ContextSchema>;

  readonly dependencies: ReadonlyArray<ContextSchema>;
  readonly providers: ReadonlyArray<ProviderConfiguration>;
  readonly exports: ReadonlyArray<Type>;
  readonly extensions: ReadonlyArray<Type<ExtensionInterface>>;

  constructor(
    readonly source: Type<ApplicationInterface>
  ) {
    const metadata = ApplicationMetadata.resolve(source);

    this.schemas = new Map<Type, ContextSchema>();
    this.extensions = metadata.extensions.map(configuration => configuration.provide);
    this.exports = metadata.extensions.map(configuration => configuration.provide);
    this.dependencies = metadata.dependencies.map(type => {
      let schema = this.schemas.get(type);

      if (!schema) {
        schema = new ModuleContextSchema(type, this, this.extensions, this.schemas);
        this.schemas.set(type, schema);
      }

      return schema;
    });
    this.providers = [...metadata.extensions, ...metadata.providers];

    this.schemas.set(source, this);
  }

  [Symbol.iterator](): Iterator<ContextSchema> {
    return this.schemas.values();
  }

  accept(visitor: ContextSchemaVisitor): void {
    visitor.application(this);
  }
}

export class ModuleContextSchema implements ContextSchema {
  readonly dependencies: ReadonlyArray<ContextSchema>;
  readonly providers: ReadonlyArray<ProviderConfiguration>;
  readonly exports: ReadonlyArray<Type>;

  constructor(
    readonly source: Type,
    readonly parent: ContextSchema,
    readonly extensions: ReadonlyArray<Type<ExtensionInterface>>,
    schemas: Map<Type, ContextSchema>
  ) {
    const metadata = ModuleMetadata.resolve(source);

    this.exports = metadata.exports;
    this.providers = metadata.providers;
    this.dependencies = metadata.dependencies.map(type => {
      let schema = schemas.get(type);

      if (!schema) {
        schema = new ModuleContextSchema(type, parent, extensions, schemas);
        schemas.set(type, schema);
      }

      return schema;
    });
  }

  accept(visitor: ContextSchemaVisitor): void {
    visitor.module(this);
  }
}
