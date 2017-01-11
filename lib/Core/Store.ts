import {IAction, IActionListenerCancel} from './Dispatcher';


export interface IStoreListener<S> {
    (state: S): void;
}


export interface IStoreReducer<S, A> {
    (state: S, action: A): S;
}


export default class Store<S, A extends IAction> {
    private _listeners: Array<IStoreListener<S>> = [];
    private _reducers: Array<IStoreReducer<S, A>> = [];
    private _state: S;


    get state(): S {
        return this._state;
    }


    constructor(initialState: S) {
        this._state = initialState;
    }


    public addReducers(...reducers: Array<IStoreReducer<S, A>>) {
        this._reducers.push(...reducers);
    }


    public addReducersMapping(reducers: {[key: string]: IStoreReducer<any, A>}) {
        Object.keys(reducers).forEach((key: string) => {
            let reduce: IStoreReducer<any, A> = reducers[key];

            this._reducers.push(function (state: any, action: A): any {
                state[key] = reduce(state[key], action);

                return state;
            });
        });
    }


    public dispatch(...actions: A[]) {
        actions.forEach((action: A) => {
            this._reducers.forEach((reducer: IStoreReducer<S, A>) => {
                this._state = reducer(this._state, action);
            });
        });

        this._listeners.forEach((listener: IStoreListener<S>) => {
            listener(this._state);
        });
    }


    public subscribe(listener: IStoreListener<S>): IActionListenerCancel {
        this._listeners.push(listener);

        return (): boolean => {
            return this.unsubscribe(listener);
        };
    }


    public unsubscribe(listener: IStoreListener<S>): boolean {
        let index = this._listeners.indexOf(listener);

        if (index >= 0) {
            this._listeners.splice(index, 1);
            return true;
        } else {
            return false;
        }
    }
}
