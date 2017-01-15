import { IAction, ActionListenerCancel } from './Dispatcher';
export declare type StoreListener<S> = (state: S) => void;
export declare type StoreReducer<S, A> = (state: S, action: A) => S;
export default class Store<S, A extends IAction> {
    private _listeners;
    private _reducers;
    private _state;
    readonly state: S;
    constructor(initialState: S);
    addReducers(...reducers: Array<StoreReducer<S, A>>): void;
    addReducersMapping(reducers: {
        [key: string]: StoreReducer<any, A>;
    }): void;
    dispatch(...actions: A[]): void;
    subscribe(listener: StoreListener<S>): ActionListenerCancel;
    unsubscribe(listener: StoreListener<S>): boolean;
}
