import EventEmitter from '../../Core/Events/EventEmitter';
import ErrorEvent from '../../Core/Events/ErrorEvent';


export abstract class Task<T> extends EventEmitter {
    private _isComplete: boolean = false;
    private _isPending: boolean = false;
    private _isResolved: boolean = false;
    private _isRejected: boolean = false;
    private _isAborted: boolean = false;
    private _result: T;
    private _error: Error;


    get result(): T {
        return this._result;
    }


    get error(): Error {
        return this._error;
    }


    get isPending(): boolean {
        return this._isPending;
    }


    get isComplete(): boolean {
        return this._isComplete;
    }


    get isResolved(): boolean {
        return this._isResolved;
    }


    get isRejected(): boolean {
        return this._isRejected;
    }


    get isAborted(): boolean {
        return this._isAborted;
    }


    public run() {
        if (this._isPending) {
            throw new Error('Task already in progress.');
        }

        if (this._isComplete) {
            if (this._error) {
                throw new Error('Task already complete (with error).');
            } else {
                throw new Error('Task already complete (successfully).');
            }
        }

        this._isPending = true;
        this._isComplete = false;

        this.doJob();
    }


    public abort() {
        this._isPending = false;
        this._isComplete = true;
        this._isAborted = true;
        this.emit(new Event('abort'));
    }


    protected abstract doJob();


    protected resolve(result: T) {
        this._isPending = false;
        this._isComplete = true;
        this._isResolved = true;
        this._result = result;
        this.emit(new Event('complete'));
    }


    protected reject(error: Error) {
        this._isPending = false;
        this._isComplete = true;
        this._isRejected = true;
        this._error = error;
        this.emit(new ErrorEvent(error));
    }
}
