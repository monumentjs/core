import { Observable } from 'rxjs';
import { Action } from './Action';

export type EffectResult = void | Action | Action[] | Promise<void | Action | Action[]> | Observable<Action>;
