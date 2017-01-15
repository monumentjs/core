import EventEmitter from '../../Core/Events/EventEmitter';
export declare abstract class Task<T> extends EventEmitter {
    private _isComplete;
    private _isPending;
    private _isResolved;
    private _isRejected;
    private _isAborted;
    private _result;
    private _error;
    readonly result: T;
    readonly error: Error;
    readonly isPending: boolean;
    readonly isComplete: boolean;
    readonly isResolved: boolean;
    readonly isRejected: boolean;
    readonly isAborted: boolean;
    run(): void;
    abort(): void;
    protected abstract doJob(): any;
    protected resolve(result: T): void;
    protected reject(error: Error): void;
}
