import EventEmitter from '../../Core/Events/EventEmitter';
import ErrorEvent from '../../Core/Events/ErrorEvent';
import {TaskEventType} from './types';
import TaskEvent from './TaskEvent';
import InvalidOperationException from '../../Core/Exceptions/InvalidOperationException';
import {AsyncResult} from '../../Core/types';


export abstract class Task<T> extends EventEmitter {
    private _isComplete: boolean = false;
    private _isPending: boolean = false;
    private _isResolved: boolean = false;
    private _isRejected: boolean = false;
    private _isAborted: boolean = false;
    private _result: T = null;
    private _error: Error = null;


    public get result(): T {
        return this._result;
    }


    public get error(): Error {
        return this._error;
    }


    public get isPending(): boolean {
        return this._isPending;
    }


    public get isComplete(): boolean {
        return this._isComplete;
    }


    public get isResolved(): boolean {
        return this._isResolved;
    }


    public get isRejected(): boolean {
        return this._isRejected;
    }


    public get isAborted(): boolean {
        return this._isAborted;
    }


    public async start(): AsyncResult<void> {
        if (this._isPending) {
            throw new InvalidOperationException('Task already in progress.');
        }

        this.ensureTaskIsNotComplete();

        this._isPending = true;
        this._isComplete = false;

        await this.doJob();
    }


    public abort(): void {
        this.ensureTaskIsNotComplete();

        this._isPending = false;
        this._isComplete = true;
        this._isAborted = true;

        this.notify(TaskEvent.ABORT);
    }


    protected abstract async doJob(): AsyncResult<void>;


    protected resolve(result: T): void {
        this._isPending = false;
        this._isComplete = true;
        this._isResolved = true;
        this._result = result;

        this.notify(TaskEvent.COMPLETE);
    }


    protected reject(error: Error): void {
        this._isPending = false;
        this._isComplete = true;
        this._isRejected = true;
        this._error = error;

        this.dispatchEvent(new ErrorEvent(error));
    }


    protected ensureTaskIsNotComplete(): void {
        if (this._isComplete) {
            if (this._error) {
                throw new InvalidOperationException('Task already complete (with error).');
            } else {
                throw new InvalidOperationException('Task already complete (successfully).');
            }
        }
    }


    protected notify(eventType: TaskEventType): void {
        this.dispatchEvent(new TaskEvent(eventType, this));
    }
}
