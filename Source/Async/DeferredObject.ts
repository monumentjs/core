

export class DeferredObject<T = void> {
    private _isPending: boolean = true;
    private _isResolved: boolean = false;
    private _isRejected: boolean = false;
    private _promise: Promise<T>;
    private _resolve: (value?: (PromiseLike<T> | T)) => void;
    private _reject: (reason?: any) => void;


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
        });
    }


    public resolve(value?: PromiseLike<T> | T): void {
        if (this._isPending) {
            this._isPending = false;
            this._isResolved = true;
            this._resolve(value);
        }
    }


    public reject(reason?: any): void {
        if (this._isPending) {
            this._isPending = false;
            this._isRejected = true;
            this._reject(reason);
        }
    }
}
