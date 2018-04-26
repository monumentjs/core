import {InvalidOperationException} from '@monument/core/main/exceptions/InvalidOperationException';
import {Exception} from '@monument/core/main/exceptions/Exception';
import {CancellationToken} from './CancellationToken';
import {Task} from './Task';


export abstract class Operation<TResult = void> implements Task {
    private _isCompleted: boolean = false;
    private _isRunning: boolean = false;
    private _isResolved: boolean = false;
    private _isRejected: boolean = false;
    private _result?: TResult;
    private _error?: Exception;


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


    public get isResolved(): boolean {
        return this._isResolved;
    }


    public get isRejected(): boolean {
        return this._isRejected;
    }


    public async run(cancellationToken?: CancellationToken): Promise<void> {
        if (this.isRunning) {
            throw new InvalidOperationException('Operation already running.');
        }

        if (this.isCompleted) {
            throw new InvalidOperationException('Operation already completed.');
        }

        this._isRunning = true;

        try {
            const result: TResult = await this.execute(cancellationToken);

            this._isRunning = false;
            this._isCompleted = true;
            this._isResolved = true;
            this._result = result;
        } catch (e) {
            this._isRunning = false;
            this._isCompleted = true;
            this._isRejected = true;
            this._error = e;
        }
    }


    protected abstract execute(cancellationToken?: CancellationToken): Promise<TResult>;
}
