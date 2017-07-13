export declare class DeferredObject<T = void> {
    private _isPending;
    private _isResolved;
    private _isRejected;
    private _promise;
    private _resolve;
    private _reject;
    readonly promise: Promise<T>;
    readonly isPending: boolean;
    readonly isResolved: boolean;
    readonly isRejected: boolean;
    constructor();
    resolve(value?: PromiseLike<T> | T): void;
    reject(reason?: any): void;
}
