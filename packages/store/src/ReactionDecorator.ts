import 'reflect-metadata';

const DECORATORS = Symbol();

/**
 * Represents `@Reaction` decorator metadata.
 * @since 0.11.0
 * @author Alex Chugaev
 */
export class ReactionDecorator {
  /**
   * Decorates method of specific class.
   * @param prototype Class prototype
   * @param methodName Method name
   * @param actionType Type of action
   * @since 0.11.0
   * @author Alex Chugaev
   */
  static decorate(prototype: object, methodName: PropertyKey, actionType: string) {
    let decorators: ReactionDecorator[] | undefined = Reflect.getMetadata(DECORATORS, prototype);

    if (decorators == null) {
      decorators = [];

      Reflect.defineMetadata(DECORATORS, decorators, prototype);
    }

    decorators.push(new ReactionDecorator(methodName, actionType));
  }

  /**
   * Gets decorator metadata.
   * @param instance Object instance
   * @since 0.11.0
   * @author Alex Chugaev
   */
  static ofInstance(instance: object): ReactionDecorator[] {
    return Reflect.getMetadata(DECORATORS, Reflect.getPrototypeOf(instance)) || [];
  }

  /**
   * Gets method name.
   * @since 0.11.0
   * @author Alex Chugaev
   */
  readonly methodName: PropertyKey;

  /**
   * Gets type of action.
   * @since 0.11.0
   * @author Alex Chugaev
   */
  readonly actionType: string;

  /**
   * Initializes new instance.
   * @param methodName Method name
   * @param actionType Type of action
   * @since 0.11.0
   * @author Alex Chugaev
   */
  constructor(methodName: PropertyKey, actionType: string) {
    this.methodName = methodName;
    this.actionType = actionType;
  }
}
