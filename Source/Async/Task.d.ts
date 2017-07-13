import { EventEmitter } from '../Events/EventEmitter';
import { TaskEventType } from './types';
export declare abstract class Task<T = void> extends EventEmitter {
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
    start(): Promise<void>;
    abort(): void;
    protected abstract execute(): Promise<void>;
    protected resolve(result: T): void;
    protected reject(error: Error): void;
    protected ensureTaskIsNotComplete(): void;
    protected notify(eventType: TaskEventType): void;
}
