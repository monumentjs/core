import { Observable } from 'rxjs';
import { Action } from './Action';

export type EffectResult<TAction extends Action> = void | TAction[] | Promise<void | TAction[]> | Observable<TAction>;
