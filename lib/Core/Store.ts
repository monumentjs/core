import {IAction, ActionListenerCancel} from './Dispatcher';


export type StoreListener<S> = (state: S) => void;
export type StoreReducer<S, A> = (state: S, action: A) => S;

/**
 * Provides state storage that mutates when some action happened.
 * State mutates by reducers - functions that mutates state in respond to action.
 * This entity usually used to centrally manipulate the state and notify different parts of the application
 * about state change.
 *
 * @param S Specifies the shape of state object.
 * @param A Specifies the shape of action object.
 */
export default class Store<S, A extends IAction> {
    private _listeners: Array<StoreListener<S>> = [];
    private _reducers: Array<StoreReducer<S, A>> = [];
    private _state: S;

    /**
     * Returns state at the current moment of time.
     * @return Current state.
     */
    get state(): S {
        return this._state;
    }

    /**
     * Creates new instance of class Store.
     * @param initialState Initial state of current store.
     */
    constructor(initialState: S) {
        this._state = initialState;
    }

    /**
     * Attaches state reducers to current store instance.
     *
     * @param reducers One or more state reducers.
     *
     * @example Add reducer (function that mutates the store) to the store instance.
     *
     * ```typescript
     * store.addReducers((state: StoreState, action: StoreAction) => {
     *     switch (action.type) {
     *         case: StoreActionType.Reset:
     *             return {
     *                 items: [],
     *                 page: 0
     *             };
     *     }
     *
     *     return state;
     * });
     * ```
     */
    public addReducers(...reducers: Array<StoreReducer<S, A>>) {
        this._reducers.push(...reducers);
    }


    public addReducersMapping(reducers: {[key: string]: StoreReducer<any, A>}) {
        Object.keys(reducers).forEach((key: string) => {
            let reduce: StoreReducer<any, A> = reducers[key];

            this._reducers.push(function (state: any, action: A): any {
                state[key] = reduce(state[key], action);

                return state;
            });
        });
    }


    public dispatch(...actions: A[]) {
        actions.forEach((action: A) => {
            this._reducers.forEach((reducer: StoreReducer<S, A>) => {
                this._state = reducer(this._state, action);
            });
        });

        this._listeners.forEach((listener: StoreListener<S>) => {
            listener(this._state);
        });
    }


    public subscribe(listener: StoreListener<S>): ActionListenerCancel {
        this._listeners.push(listener);

        return (): boolean => {
            return this.unsubscribe(listener);
        };
    }


    public unsubscribe(listener: StoreListener<S>): boolean {
        let index = this._listeners.indexOf(listener);

        if (index >= 0) {
            this._listeners.splice(index, 1);
            return true;
        } else {
            return false;
        }
    }
}
