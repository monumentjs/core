import { Delegate, Type } from '@monument/core';

export interface ClassProviderConfiguration<T extends object> {
  provide: Type<T>;
  useClass: Type<T>;
  deps?: Array<Type>;
}

export interface ExistingProviderConfiguration<T extends object> {
  provide: Type<T>;
  useExisting: Type<T>;
  deps?: Array<Type>;
}

export interface FactoryProviderConfiguration<T extends object> {
  provide: Type<T>;
  useFactory: Delegate<Array<object>, T>;
  deps?: Array<Type>;
}

export interface ValueProviderConfiguration<T extends object> {
  provide: Type<T>;
  useValue: T;
}

export type ProviderConfiguration<T extends object = object> =
  ClassProviderConfiguration<T>
  | FactoryProviderConfiguration<T>
  | ValueProviderConfiguration<T>
  | ExistingProviderConfiguration<T>;
