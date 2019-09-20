import 'reflect-metadata';
import { Type } from '@monument/contracts';

const DECORATORS = Symbol();

/**
 * Represents `@Catch` decorator metadata.
 * @since 0.11.0
 * @author Alex Chugaev
 */
export class CatchDecorator {
  /**
   * Decorates method of specific class.
   * @param prototype Class prototype
   * @param methodName Method name
   * @param errorType Error type
   * @since 0.11.0
   * @author Alex Chugaev
   */
  static decorate(prototype: object, methodName: PropertyKey, errorType: Type<Error>) {
    let decorators: CatchDecorator[] | undefined = Reflect.getMetadata(DECORATORS, prototype);

    if (decorators == null) {
      decorators = [];

      Reflect.defineMetadata(DECORATORS, decorators, prototype);
    }

    decorators.push(new CatchDecorator(methodName, errorType));
  }

  /**
   * Gets decorator metadata.
   * @param instance Object instance
   * @since 0.11.0
   * @author Alex Chugaev
   */
  static ofInstance(instance: object): CatchDecorator[] {
    return Reflect.getMetadata(DECORATORS, Reflect.getPrototypeOf(instance)) || [];
  }

  /**
   * Gets method name.
   * @since 0.11.0
   * @author Alex Chugaev
   */
  readonly methodName: PropertyKey;

  /**
   * Gets error type.
   * @since 0.11.0
   * @author Alex Chugaev
   */
  readonly errorType: Type<Error>;

  /**
   * Initializes new instance.
   * @param methodName Method name
   * @param errorType Error type
   * @since 0.11.0
   * @author Alex Chugaev
   */
  constructor(methodName: PropertyKey, errorType: Type<Error>) {
    this.methodName = methodName;
    this.errorType = errorType;
  }
}
