import { BehaviorSubject } from 'rxjs';
import { Action } from './Action';
import { ActionReducerFunction } from './ActionReducerFunction';
import { EffectHandlerFunction } from './EffectHandlerFunction';
import { EffectResult } from './EffectResult';

export class Store<TState, TAction extends Action> extends BehaviorSubject<TState> {
    private readonly _reducer: ActionReducerFunction<TState, TAction>;
    private readonly _effects: Array<EffectHandlerFunction<TAction>>;

    public constructor(
        initialState: TState,
        reducer: ActionReducerFunction<TState, TAction>,
        ...effects: Array<EffectHandlerFunction<TAction>>
    ) {
        super(initialState);
        this._reducer = reducer;
        this._effects = effects;
    }

    public dispatch(action: TAction): void {
        const oldState: TState = this.getValue();
        const newState: TState = this._reducer(oldState, action);

        if (oldState !== newState) {
            this.next(newState);

            this._effects.forEach((effect: EffectHandlerFunction<TAction>) => {
                const effectResult: EffectResult<TAction> = effect(action);

                if (effectResult) {
                    if (effectResult instanceof Array) {
                        this.dispatchAll(effectResult);
                    } else if (effectResult instanceof Promise) {
                        effectResult.then((result: void | TAction[]) => {
                            if (result) {
                                this.dispatchAll(result);
                            }
                        });
                    } else {
                        effectResult.subscribe((nextAction: TAction) => {
                            this.dispatch(nextAction);
                        });
                    }
                }
            });
        }
    }

    public dispatchAll(actions: TAction[]): void {
        actions.forEach((action: TAction) => {
            this.dispatch(action);
        });
    }
}
