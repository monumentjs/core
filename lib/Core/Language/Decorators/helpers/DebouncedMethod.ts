

export default class DebouncedMethod {
    private _timeoutId: any;
    private _maxWaitTimeoutId: any;
    private _timestamp: number;
    private _method: Function;
    private _delay: number;
    private _leading: boolean;
    private _trailing: boolean;
    private _maxWait: number;
    private _lastArgs: IArguments | ArrayLike<any>;


    public get isPending(): boolean {
        return this._timeoutId != null;
    }


    public constructor(
        method: Function,
        delay: number,
        leading: boolean = false,
        trailing: boolean = true,
        maxWait: number = Infinity
    ) {
        if (!trailing && !leading) {
            throw new Error('Method will be never called.');
        }

        this._method = method;
        this._delay = delay;
        this._leading = leading;
        this._trailing = trailing;
        this._maxWait = maxWait;

        this.resetState();
    }


    public call(context: any, args: IArguments | ArrayLike<any>): void {
        this.togglePending();
        this.cacheLastArguments(args);
        this.cancelLastTimeout();
        this.callOnLeadingEdge(context);
        this.scheduleTrailingCall(context);
    }


    private togglePending(): void {
        this._timeoutId = this._timeoutId || -1;
    }


    private cacheLastArguments(args: IArguments | ArrayLike<any>): void {
        this._lastArgs = args;
    }


    private cancelLastTimeout(): void {
        clearTimeout(this._timeoutId);
    }


    private callOnLeadingEdge(context: any): void {
        if (this._leading && this._timeoutId === -1) {
            this._method.apply(context, this._lastArgs);
        }
    }


    private callOnTrailingEdge(context: any): void {
        if (this._trailing) {
            this._method.apply(context, this._lastArgs);
        }
    }


    private scheduleTrailingCall(context: any): void {
        this._timeoutId = setTimeout(() => {
            this.callOnTrailingEdge(context);
            this.resetState();
        }, this._delay);
    }


    private resetState(): void {
        this._timestamp = 0;
        this._timeoutId = null;
        this._maxWaitTimeoutId = null;
    }
}
