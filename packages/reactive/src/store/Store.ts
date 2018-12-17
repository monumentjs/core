import {EqualityComparator, StrictEqualityComparator} from '@monument/core';
import {Action} from '../base/Action';
import {Subject} from '../Subject';
import {AbstractSubject} from '../AbstractSubject';
import {Observer} from '../Observer';

export abstract class Store<TState, TAction extends Action> extends AbstractSubject<Readonly<TState>> implements Subject<Readonly<TState>> {
    private _state: Readonly<TState>;
    private readonly _stateComparator: EqualityComparator<Readonly<TState>>;

    public get state(): Readonly<TState> {
        return this._state;
    }

    public get stateComparator(): EqualityComparator<Readonly<TState>> {
        return this._stateComparator;
    }

    protected constructor(
        initialState: Readonly<TState>,
        stateComparator: EqualityComparator<Readonly<TState>> = StrictEqualityComparator.get()
    ) {
        super();
        this._state = initialState;
        this._stateComparator = stateComparator;
    }

    public dispatch(action: TAction): boolean {
        const newState: Readonly<TState> = this.reduce(action);

        if (!this.stateComparator.equals(this.state, newState)) {
            this._state = newState;
            this.next(newState);

            return true;
        }

        return false;
    }

    protected onNewSubscription(observer: Observer<Readonly<TState>>): void {
        observer.onNext(this.state);
    }

    protected abstract reduce(action: TAction): Readonly<TState>;
}
