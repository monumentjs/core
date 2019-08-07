import 'reflect-metadata';

const DECORATORS = Symbol();

/**
 * Represents `@Effect` decorator metadata.
 * @since 0.11.0
 * @author Alex Chugaev
 */
export class EffectDecorator {
  /**
   * Decorates method of specific class.
   * @param prototype Class prototype
   * @param property Property name
   * @param dispatch Whether to dispatch action(s) emitted by effect
   * @since 0.11.0
   * @author Alex Chugaev
   */
  static decorate(prototype: object, property: PropertyKey, dispatch: boolean) {
    let decorators: EffectDecorator[] | undefined = Reflect.getMetadata(DECORATORS, prototype);

    if (decorators == null) {
      decorators = [];

      Reflect.defineMetadata(DECORATORS, decorators, prototype);
    }

    decorators.push(new EffectDecorator(property, dispatch));
  }

  /**
   * Gets decorator metadata.
   * @param instance Object instance
   * @since 0.11.0
   * @author Alex Chugaev
   */
  static ofInstance(instance: object): EffectDecorator[] {
    return Reflect.getMetadata(DECORATORS, Reflect.getPrototypeOf(instance)) || [];
  }

  /**
   * Gets property name.
   * @since 0.11.0
   * @author Alex Chugaev
   */
  readonly property: PropertyKey;

  /**
   * Gets value whether to dispatch action(s) emitted by effect.
   * @since 0.11.0
   * @author Alex Chugaev
   */
  readonly dispatch: boolean;

  /**
   * Initializes new instance.
   * @param property Property name
   * @param dispatch Whether to dispatch action(s) emitted by effect.
   * @since 0.11.0
   * @author Alex Chugaev
   */
  constructor(property: PropertyKey, dispatch: boolean) {
    this.dispatch = dispatch;
    this.property = property;
  }
}
