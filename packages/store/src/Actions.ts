import { Observable, OperatorFunction, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Action } from './Action';

export class Actions extends Subject<Action> {
}

export function ofType<TAction extends Action>(...types: Array<TAction['type']>): OperatorFunction<Action, TAction> {
  return function(source: Observable<Action>): Observable<TAction> {
    return source.pipe(
      filter((action: Action) => types.includes(action.type))
    ) as Observable<TAction>;
  };
}
