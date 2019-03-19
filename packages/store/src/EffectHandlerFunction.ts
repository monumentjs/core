import { Action } from './Action';
import { EffectResult } from './EffectResult';

export type EffectHandlerFunction<TAction extends Action> = (action: TAction) => EffectResult<TAction>;
