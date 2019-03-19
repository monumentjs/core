import { Action } from './Action';

export type ActionReducerFunction<TState, TAction extends Action> = (state: TState, action: TAction) => TState;
