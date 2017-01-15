export default class DebouncedMethod {
    private _timeoutId;
    private _maxWaitTimeoutId;
    private _timestamp;
    private _method;
    private _delay;
    private _leading;
    private _trailing;
    private _maxWait;
    private _lastArgs;
    readonly pending: boolean;
    constructor(method: Function, delay: number, leading?: boolean, trailing?: boolean, maxWait?: number);
    call(context: any, args: IArguments | ArrayLike<any>): void;
    protected togglePending(): void;
    protected cacheLastArguments(args: IArguments | ArrayLike<any>): void;
    protected cancelLastTimeout(): void;
    protected callOnLeadingEdge(context: any): void;
    protected callOnTrailingEdge(context: any): void;
    protected scheduleTrailingCall(context: any): void;
    protected resetState(): void;
}
