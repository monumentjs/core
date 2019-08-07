import { ReactionDecorator } from './ReactionDecorator';

/**
 * Marks method of state class as action reaction which mutates state.
 * @param actionType Type of action
 * @see Action.type
 * @since 0.11.0
 * @author Alex Chugaev
 */
export function Reaction(actionType: string): MethodDecorator {
  return function(prototype: object, method: PropertyKey) {
    ReactionDecorator.decorate(prototype, method, actionType);
  };
}
