import {Action} from './Action';
import {EffectResult} from './EffectResult';

export interface Effect<TAction extends Action = Action> {
    onAction(action: TAction): EffectResult<TAction>;
}
