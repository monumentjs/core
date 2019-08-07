import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { OperationNotSupportedException } from '@monument/core';
import { Action } from './Action';

/**
 * Represents stream of actions.
 * @since 0.11.0
 * @author Alex Chugaev
 */
export class Actions extends Subject<Action> {
  /**
   * Narrows stream to receive only actions of specific types.
   * @param types Required action types
   * @since 0.11.0
   * @author Alex Chugaev
   */
  ofType<TAction extends Action>(...types: Array<TAction['type']>): Observable<TAction> {
    return this.pipe(
      filter((action: Action) => types.includes(action.type))
    ) as Observable<TAction>;
  }

  complete(): void {
    throw new OperationNotSupportedException('Actions stream cannot be complete');
  }

  error(err: any): void {
    throw new OperationNotSupportedException('Actions stream cannot throw errors', err);
  }
}
