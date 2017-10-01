import {ErrorEventArgs} from '../Events/ErrorEventArgs';
import {TaskEventArgs} from './TaskEventArgs';
import {InvalidOperationException} from '../Exceptions/InvalidOperationException';
import {EventBinding} from '../Events/EventBinding';
import {EventBindings} from '../Events/EventBindings';
import {Exception} from '../Exceptions/Exception';
import {IDisposable} from '../Core/Abstraction/IDisposable';
import {EventSource} from '../Events/EventSource';


export abstract class Task<TResult = void> implements IDisposable {
    private _eventBindings: EventBindings<this> = new EventBindings(this);
    private _isComplete: boolean = false;
    private _isPending: boolean = false;
    private _isResolved: boolean = false;
    private _isRejected: boolean = false;
    private _isAborted: boolean = false;
    private _result: TResult;
    private _error: Exception;

    private _onError: EventBinding<this, ErrorEventArgs> = this._eventBindings.create();
    private _onComplete: EventBinding<this, TaskEventArgs> = this._eventBindings.create();
    private _onAbort: EventBinding<this, TaskEventArgs> = this._eventBindings.create();


    public get onAbort(): EventSource<this, TaskEventArgs> {
        return this._onAbort;
    }


    public get onComplete(): EventSource<this, TaskEventArgs> {
        return this._onComplete;
    }


    public get onError(): EventSource<this, ErrorEventArgs> {
        return this._onError;
    }


    public get result(): TResult | undefined {
        return this._result;
    }


    public get error(): Exception | undefined {
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


    public start(): Promise<void> {
        if (this.isPending) {
            throw new InvalidOperationException('Task already in progress.');
        }

        this.ensureTaskIsNotComplete();

        this._isPending = true;
        this._isComplete = false;

        return this.execute();
    }


    public abort(): void {
        this.ensureTaskIsNotComplete();

        this._isPending = false;
        this._isComplete = true;
        this._isAborted = true;

        this._onAbort.dispatch(new TaskEventArgs());
    }


    public dispose(): void {
        this._eventBindings.dispose();
    }


    protected abstract execute(): Promise<void>;


    protected resolve(result: TResult): void {
        if (this._isComplete === false) {
            this._isComplete = true;
            this._isPending = false;
            this._isResolved = true;
            this._result = result;

            this._onComplete.dispatch(new TaskEventArgs());
        }
    }


    protected reject(error: Exception): void {
        if (this._isComplete === false) {
            this._isComplete = true;
            this._isPending = false;
            this._isRejected = true;
            this._error = error;

            this._onError.dispatch(new ErrorEventArgs(error));
        }
    }


    protected ensureTaskIsNotComplete(): void {
        if (this.isComplete) {
            if (this.error) {
                throw new InvalidOperationException('Task already complete with error.');
            } else {
                throw new InvalidOperationException('Task already complete.');
            }
        }
    }
}
