import {Lifecycle} from './Lifecycle';
import {LifecycleState} from './LifecycleState';


export class AbstractLifecycle implements Lifecycle {
    private _state: LifecycleState = LifecycleState.INITIALIZED;


    public get isInitialized(): boolean {
        return this._state === LifecycleState.INITIALIZED;
    }


    public get isStarted(): boolean {
        return this._state === LifecycleState.STARTED;
    }


    public get isStarting(): boolean {
        return this._state === LifecycleState.STARTING;
    }


    public get isStopped(): boolean {
        return this._state === LifecycleState.STOPPED;
    }


    public get isStopping(): boolean {
        return this._state === LifecycleState.STOPPING;
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
        this._state = state;
    }
}
