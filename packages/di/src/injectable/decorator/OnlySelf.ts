import { Class } from '@monument/reflect';
import { Key } from '@monument/collections';

export const ONLY_SELF_METADATA = new Key<boolean>('Injectable param resolved only from own injector');

export function OnlySelf(): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if (target instanceof Function && propertyKey == null) {
      const klass = Class.of(target);

      klass.parameters[parameterIndex].metadata.attributes.set(ONLY_SELF_METADATA, true);
    }
  };
}
