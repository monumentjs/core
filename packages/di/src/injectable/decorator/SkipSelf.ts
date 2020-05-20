import { Class } from '@monument/reflect';
import { Key } from '@monument/collections';

export const SKIP_SELF_METADATA = new Key<boolean>('Injectable param resolved from parent injectors chain');

export function SkipSelf(): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if (target instanceof Function && propertyKey == null) {
      const klass = Class.of(target);

      klass.parameters[parameterIndex].metadata.attributes.set(SKIP_SELF_METADATA, true);
    }
  };
}
