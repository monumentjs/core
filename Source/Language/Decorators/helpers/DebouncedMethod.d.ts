export declare class DebouncedMethod {
    private _timeoutId;
    private _maxWaitTimeoutId;
    private _timestamp;
    private _method;
    private _delay;
    private _leading;
    private _trailing;
    private _maxWait;
    private _lastArgs;
    readonly isPending: boolean;
    constructor(method: Function, delay: number, leading?: boolean, trailing?: boolean, maxWait?: number);
    call(context: any, args: IArguments | ArrayLike<any>): void;
    private togglePending();
    private cacheLastArguments(args);
    private cancelLastTimeout();
    private callOnLeadingEdge(context);
    private callOnTrailingEdge(context);
    private scheduleTrailingCall(context);
    private resetState();
}
