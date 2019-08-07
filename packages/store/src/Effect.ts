import { EffectDecorator } from './EffectDecorator';

/**
 * Represents configuration of `@Effect` decorator.
 * @see Effect
 * @since 0.11.0
 * @author Alex Chugaev
 */
export interface EffectDecoratorConfiguration {
  /**
   * Defines whether action(s) emitted by effect stream should be dispatched.
   * @since 0.11.0
   * @author Alex Chugaev
   */
  readonly dispatch: boolean;
}

/**
 * Marks property of effects class as effect.
 * @param configuration Decorator configuration
 * @see EffectDecoratorConfiguration
 * @see EffectMediator
 * @see EffectSource
 * @since 0.11.0
 * @author Alex Chugaev
 */
export function Effect(configuration: EffectDecoratorConfiguration = {
  dispatch: true
}): PropertyDecorator {
  return (prototype: object, propertyKey: PropertyKey) => {
    EffectDecorator.decorate(prototype, propertyKey, configuration.dispatch);
  };
}
