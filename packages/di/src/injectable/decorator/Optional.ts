import { Class } from '@monument/reflect';
import { Key } from '@monument/collections';

export const OPTIONAL_METADATA = new Key<boolean>('Injectable param is optional');

export function Optional(): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if (target instanceof Function && propertyKey == null) {
      const klass = Class.of(target);

      klass.parameters[parameterIndex].metadata.attributes.set(OPTIONAL_METADATA, true);
    }
  };
}
