import {Dispatcher, ActionListenerCancel} from '../../Core/Events/Dispatcher';
import {assertArgumentNotNull} from '../../Core/Assertion/Assert';


export type StateWatcher<TState extends object> = (state: TState) => void;


export abstract class StateContainer<TState extends object> {
    private _dispatcher: Dispatcher = new Dispatcher();
    private _state: TState;


    public get state(): TState {
        return this._state;
    }


    public constructor() {
        this._state = this.getInitialState();
    }


    public dispatchAction(action: object): void {
        assertArgumentNotNull('action', action);

        this.mutateState(action);
        this._dispatcher.dispatchAction(this._state);
    }


    public addWatcher(watcher: StateWatcher<TState>): ActionListenerCancel {
        assertArgumentNotNull('watcher', watcher);

        return this._dispatcher.addListener(watcher);
    }


    public removeWatcher(watcher: StateWatcher<TState>): boolean {
        assertArgumentNotNull('watcher', watcher);

        return this._dispatcher.removeListener(watcher);
    }


    public resetState(): void {
        this._state = this.getInitialState();

        this._dispatcher.dispatchAction(this._state);
    }


    protected abstract getInitialState(): TState;
    protected abstract mutateState(action: object): void;
}
