import Dispatcher from './Dispatcher';
import ArgumentNullException from './Exceptions/ArgumentNullException';
import {ActionListenerCancel} from './Dispatcher';


export type StateWatcher<TState extends object> = (state: TState) => void;

/**
 * Provides abstract container for state that mutates when some action happened.
 * State mutates by reducers - functions that mutates state in respond to action.
 * This entity usually used to centrally manipulate the state and notify different parts of the application
 * about state change.
 *
 * @param S Specifies the shape of state object.
 * @param A Specifies the shape of action object.
 */
export abstract class StateContainer<TState extends object> {
    private _dispatcher: Dispatcher = new Dispatcher();
    private _state: TState;

    /**
     * Returns state at the current moment of time.
     * @return Current state.
     */
    public get state(): TState {
        return this._state;
    }

    /**
     * Creates new instance of class Store.
     */
    public constructor() {
        this._state = this.getInitialState();
    }


    public dispatchAction(action: object): void {
        if (action == null) {
            throw new ArgumentNullException('action');
        }

        this.mutateState(action);
        this._dispatcher.dispatchAction(this._state);
    }


    public addWatcher(watcher: StateWatcher<TState>): ActionListenerCancel {
        if (watcher == null) {
            throw new ArgumentNullException('watcher');
        }

        return this._dispatcher.addListener(watcher);
    }


    public removeWatcher(watcher: StateWatcher<TState>): boolean {
        if (watcher == null) {
            throw new ArgumentNullException('watcher');
        }

        return this._dispatcher.removeListener(watcher);
    }


    public resetState(): void {
        this._state = this.getInitialState();

        this._dispatcher.dispatchAction(this._state);
    }


    protected abstract getInitialState(): TState;
    protected abstract mutateState(action: object): void;
}
