import {InvalidOperationException} from '@monument/core/main/exceptions/InvalidOperationException';
import {Exception} from '@monument/core/main/exceptions/Exception';
import {EventDispatcher} from '@monument/events-core/main/EventDispatcher';
import {EventArgs} from '@monument/events-core/main/EventArgs';
import {ErrorEventArgs} from '@monument/events-core/main/ErrorEventArgs';
import {EventSource} from '@monument/events-core/main/EventSource';
import {Task} from './Task';
import {Runnable} from './Runnable';


export class Operation<TResult = void> extends AbstractComponent implements Task<TResult> {
    private _isCompleted: boolean = false;
    private _isRunning: boolean = false;
    private _isResolved: boolean = false;
    private _isRejected: boolean = false;
    private _isStopped: boolean = false;
    private _executor: Runnable<TResult>;
    private _result: TResult;
    private _error: Exception;

    private _aborted: EventDispatcher<this, EventArgs> = this.createEventDispatcher();
    private _completed: EventDispatcher<this, EventArgs> = this.createEventDispatcher();
    private _failed: EventDispatcher<this, ErrorEventArgs> = this.createEventDispatcher();


    public get aborted(): EventSource<this, EventArgs> {
        return this._aborted;
    }


    public get completed(): EventSource<this, EventArgs> {
        return this._completed;
    }


    public get failed(): EventSource<this, ErrorEventArgs> {
        return this._failed;
    }


    public get result(): TResult | undefined {
        return this._result;
    }


    public get error(): Exception | undefined {
        return this._error;
    }


    public get isRunning(): boolean {
        return this._isRunning;
    }


    public get isCompleted(): boolean {
        return this._isCompleted;
    }


    public get isStopped(): boolean {
        return this._isStopped;
    }


    public get isResolved(): boolean {
        return this._isResolved;
    }


    public get isRejected(): boolean {
        return this._isRejected;
    }


    public constructor(executor: Runnable<TResult>) {
        super();

        this._executor = executor;
    }


    public run(): Promise<TResult> {
        this.ensureTaskIsNotRunning();
        this.ensureTaskIsNotComplete();

        this._isRunning = true;
        this._isCompleted = false;

        return this.execute();
    }


    public stop(): Promise<void> {
        this.ensureTaskIsRunning();

        this._isRunning = false;
        this._isCompleted = true;
        this._isStopped = true;

        this._aborted.dispatch(new EventArgs());

        return Promise.resolve();
    }


    public dispose(): void {
        if (!this.isCompleted) {
            this.stop();
        }

        super.dispose();
    }


    private async execute(): Promise<void> {
        try {
            let result: TResult = await this._executor.run();

            this.resolve(result);
        } catch (ex) {
            this.reject(ex);
        }
    }


    private resolve(result: TResult): void {
        if (this._isCompleted === false) {
            this._isCompleted = true;
            this._isRunning = false;
            this._isResolved = true;
            this._result = result;

            this._completed.dispatch(new EventArgs());
        }
    }


    private reject(error: Exception): void {
        if (this._isCompleted === false) {
            this._isCompleted = true;
            this._isRunning = false;
            this._isRejected = true;
            this._error = error;

            this._failed.dispatch(new ErrorEventArgs(error));
        }
    }


    private ensureTaskIsRunning() {
        if (!this.isRunning) {
            throw new InvalidOperationException('Operation is not running.');
        }
    }


    private ensureTaskIsNotRunning() {
        if (this.isRunning) {
            throw new InvalidOperationException('Operation already running.');
        }
    }


    private ensureTaskIsNotComplete(): void {
        if (this.isCompleted) {
            if (this.error) {
                throw new InvalidOperationException('Operation already complete with error.');
            } else {
                throw new InvalidOperationException('Operation already complete.');
            }
        }
    }
}
