import {Action} from './Action';
import {Observable} from '../base/Observable';

export type EffectResult<TAction extends Action = Action> = TAction[] | Observable<TAction> | void;
