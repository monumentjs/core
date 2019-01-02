import {Action} from './Action';
import {BehaviorSubject} from '../base/BehaviorSubject';
import {Effects} from './Effects';
import {Actions} from './Actions';

/**
 * @since 0.0.1
 * @author Alex Chugaev
 */
export abstract class Store<TState, TAction extends Action> extends BehaviorSubject<TState> {

    protected constructor(
        initialState: TState,
        actions: Actions<TAction>,
        effects?: Effects<TAction>
    ) {
        super(initialState);

        actions.subscribe((action: TAction): void => {
            this.next(this.reduce(action));
        });

        if (effects) {
            // Creates vicious circle for each effect:
            // Each effect can react on actions and push back new ones through mediator.
            effects.use(actions).subscribe(actions);
        }
    }

    public next(value: TState) {
        if (this.value !== value) {
            super.next(value);
        }
    }

    protected abstract reduce(action: TAction): TState;
}
