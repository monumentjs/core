import {Lifecycle} from './Lifecycle';
import {LifecycleState} from './LifecycleState';
import {InvalidStateException} from '../exceptions/InvalidStateException';


export class AbstractLifecycle implements Lifecycle {
    private _state: LifecycleState = LifecycleState.PENDING;


    public get isPending(): boolean {
        return this._state === LifecycleState.PENDING;
    }


    public get isInitializing(): boolean {
        return this._state === LifecycleState.INITIALIZING;
    }


    public get isInitialized(): boolean {
        return this._state >= LifecycleState.INITIALIZED;
    }


    public get isStarting(): boolean {
        return this._state === LifecycleState.STARTING;
    }


    public get isStarted(): boolean {
        return this._state >= LifecycleState.STARTED;
    }


    public get isStopping(): boolean {
        return this._state === LifecycleState.STOPPING;
    }


    public get isStopped(): boolean {
        return this._state === LifecycleState.STOPPED;
    }


    public async initialize(): Promise<void> {
        this.setState(LifecycleState.INITIALIZED);
    }


    public async start(): Promise<void> {
        this.setState(LifecycleState.STARTED);
    }


    public async stop(): Promise<void> {
        this.setState(LifecycleState.STOPPED);
    }


    protected setInitializing(): void {
        this.setState(LifecycleState.INITIALIZING);
    }


    protected setInitialized(): void {
        this.setState(LifecycleState.INITIALIZED);
    }


    protected setStarting(): void {
        this.setState(LifecycleState.STARTING);
    }


    protected setStarted(): void {
        this.setState(LifecycleState.STARTED);
    }


    protected setStopping(): void {
        this.setState(LifecycleState.STOPPING);
    }


    protected setStopped(): void {
        this.setState(LifecycleState.STOPPED);
    }


    private setState(state: LifecycleState): void {
        if (state <= this._state) {
            throw new InvalidStateException(
                `Transition from state ${LifecycleState[this._state]} to ${LifecycleState[state]} is not possible.`
            );
        }

        this._state = state;
    }
}
