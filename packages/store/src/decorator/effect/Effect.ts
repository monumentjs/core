import { EffectManager } from './EffectManager';

export interface EffectConfiguration {
  dispatch: boolean;
}

export function Effect(configuration: EffectConfiguration = {
  dispatch: true
}): PropertyDecorator {
  return (prototype: object, propertyKey: PropertyKey) => {
    const manager: EffectManager = EffectManager.ofPrototype(prototype);

    manager.add(propertyKey, configuration.dispatch);
  };
}
