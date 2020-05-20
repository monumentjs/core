import { Type } from '@monument/core';
import { Class } from '@monument/reflect';
import { Key } from '@monument/collections';

export const INJECT_METADATA = new Key<Type>('Injectable param type override');

/**
 * Overrides injection key of constructor's parameter.
 */
export function Inject<T extends object>(type: Type<T>): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if (target instanceof Function && propertyKey == null) {
      const klass = Class.of(target);

      klass.parameters[parameterIndex].metadata.attributes.set(INJECT_METADATA, type);
    }
  };
}
