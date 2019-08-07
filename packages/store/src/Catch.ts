import { Type } from '@monument/core';
import { CatchDecorator } from './CatchDecorator';

/**
 * Marks method of state class as action reaction which mutates state.
 * @param errorType Type of error
 * @see Action.type
 * @since 0.11.0
 * @author Alex Chugaev
 */
export function Catch(errorType: Type<Error>): MethodDecorator {
  return function(prototype: object, method: PropertyKey) {
    CatchDecorator.decorate(prototype, method, errorType);
  };
}
