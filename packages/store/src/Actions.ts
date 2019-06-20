import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Action } from './Action';

export class Actions extends Subject<Action> {
  ofType<TAction extends Action>(type: string): Observable<TAction> {
    return this.pipe(filter((action: Action) => action.type === type)) as Observable<TAction>;
  }
}
