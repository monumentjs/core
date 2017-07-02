

export class DeferredObject<T> {
    private _isPending: boolean = true;
    private _promise: Promise<T>;
    private _resolve: (value?: (PromiseLike<T> | T)) => void;
    private _reject: (reason?: any) => void;


    public get promise(): Promise<T> {
        return this._promise;
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
            this._resolve(value);
        }
    }


    public reject(reason?: any): void {
        if (this._isPending) {
            this._isPending = false;
            this._reject(reason);
        }
    }
}
