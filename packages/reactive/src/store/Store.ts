import { Action } from './Action';
import { BehaviorSubject } from '../base/BehaviorSubject';
import { Effect } from './Effect';
import { Actions } from './Actions';

/**
 * @since 0.0.1
 * @author Alex Chugaev
 */
export abstract class Store<TState, TAction extends Action> extends BehaviorSubject<TState> {
    private readonly _actions: Actions<TAction>;
    private readonly _effects: Array<Effect<TAction>>;

    protected constructor(initialState: TState, actions: Actions<TAction>, ...effects: Array<Effect<TAction>>) {
        super(initialState);
        this._actions = actions;
        this._effects = effects;

        actions.subscribe(
            (action: TAction): void => {
                this.processState(action);
                this.processEffects(action);
            }
        );
    }

    public next(value: TState) {
        if (this.value !== value) {
            super.next(value);
        }
    }

    protected abstract reduce(action: TAction): TState;

    private processEffects(action: TAction) {
        for (const effect of this._effects) {
            const result = effect.onAction(action);

            if (result) {
                if (result instanceof Array) {
                    for (const newAction of result) {
                        this._actions.next(newAction);
                    }
                } else {
                    const subscription = result.subscribe(
                        (newAction: TAction) => {
                            this._actions.next(newAction);
                        },
                        undefined,
                        () => {
                            subscription.unsubscribe();
                        }
                    );
                }
            }
        }
    }

    private processState(action: TAction) {
        this.next(this.reduce(action));
    }
}
