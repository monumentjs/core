

export class DeferredObject<T = void> {
    private _isPending: boolean = true;
    private _isResolved: boolean = false;
    private _isRejected: boolean = false;
    private readonly _promise: Promise<T>;
    private _resolve?: (value?: (PromiseLike<T> | T)) => void;
    private _reject?: (reason?: any) => void;
    private _result: PromiseLike<T> | T | undefined;
    private _error: any;


    public get promise(): Promise<T> {
        return this._promise;
    }


    public get isPending(): boolean {
        return this._isPending;
    }


    public get isResolved(): boolean {
        return this._isResolved;
    }


    public get isRejected(): boolean {
        return this._isRejected;
    }


    public constructor() {
        this._promise = new Promise((resolve, reject): void => {
            this._resolve = resolve;
            this._reject = reject;

            if (!this.isPending) {
                if (this.isResolved) {
                    resolve(this._result);
                } else {
                    reject(this._error);
                }
            }
        });
    }


    public resolve(result?: PromiseLike<T> | T): void {
        if (this._isPending) {
            this._result = result;
            this._isPending = false;
            this._isResolved = true;

            if (this._resolve != null) {
                this._resolve(result);
            }
        }
    }


    public reject(reason: Error): void {
        if (this._isPending) {
            this._error = reason;
            this._isPending = false;
            this._isRejected = true;

            if (this._reject != null) {
                this._reject(reason);
            }
        }
    }
}
