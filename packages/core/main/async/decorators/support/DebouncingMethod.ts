import {MethodCallEdge} from './MethodCallEdge';


class MethodCall {
    public readonly context: any;
    public readonly args: ArrayLike<any>;


    public constructor(context: any, args: ArrayLike<any>) {
        this.context = context;
        this.args = args;
    }
}


abstract class MethodState {
    protected method: DebouncingMethod;


    public abstract get isThrottling(): boolean;


    public constructor(method: DebouncingMethod) {
        this.method = method;
    }


    public abstract call(): void;
    public abstract onEnter(): void;
    public abstract onLeave(): void;
}


class NormalState extends MethodState {
    public get isThrottling(): boolean {
        return false;
    }


    public call(): void {
        this.method.enableThrottling();
    }


    public onEnter(): void {
        // Do nothing
    }


    public onLeave(): void {
        // Do nothing
    }
}


class ThrottlingState extends MethodState {
    private _throttlingTimeoutId: any;
    private _maxWaitTimeoutId: any;


    public get isThrottling(): boolean {
        return true;
    }


    public call(): void {
        this.prolongThrottling();
    }

    // State change hooks

    public onEnter(): void {
        if (this.method.canCallOnLeadingEdge) {
            this.method.release();
        }

        this.scheduleThrottlingCancellation();
        this.scheduleMaxWaitTimeout();
    }


    public onLeave(): void {
        if (this.method.canCallOnTrailingEdge) {
            this.method.release();
        }

        this.abortThrottlingCancellation();
    }

    // Throttling control

    private prolongThrottling(): void {
        this.abortThrottlingCancellation();
        this.scheduleThrottlingCancellation();
    }


    private disableThrottling(): void {
        this.abortThrottlingCancellation();
        this.abortMaxWaitTimeout();
        this.method.disableThrottling();
    }

    // Throttling timeout

    private scheduleThrottlingCancellation(): void {
        this._throttlingTimeoutId = setTimeout(() => {
            this.disableThrottling();
        }, this.method.delay);
    }


    private abortThrottlingCancellation(): void {
        clearTimeout(this._throttlingTimeoutId);

        delete this._throttlingTimeoutId;
    }

    // Max wait timeout

    private scheduleMaxWaitTimeout(): void {
        if (isFinite(this.method.maxWait)) {
            this._maxWaitTimeoutId = setTimeout(() => {
                this.disableThrottling();
            }, this.method.maxWait);
        }
    }


    private abortMaxWaitTimeout(): void {
        clearTimeout(this._maxWaitTimeoutId);

        delete this._maxWaitTimeoutId;
    }
}


export class DebouncingMethod {
    private readonly _normalState: MethodState;
    private readonly _throttlingState: MethodState;
    private _currentState: MethodState;

    private _lastCall: MethodCall | undefined;
    private _lastReturnValue: any;

    private readonly _method: Function;
    private readonly _delay: number;
    private readonly _maxWait: number;
    private readonly _callEdge: MethodCallEdge;


    public get isThrottling(): boolean {
        return this.currentState.isThrottling;
    }


    public get delay(): number {
        return this._delay;
    }


    public get maxWait(): number {
        return this._maxWait;
    }


    public get canCallOnLeadingEdge(): boolean {
        return this._callEdge === MethodCallEdge.LEADING || this._callEdge === MethodCallEdge.BOTH;
    }


    public get canCallOnTrailingEdge(): boolean {
        return this._callEdge === MethodCallEdge.TRAILING || this._callEdge === MethodCallEdge.BOTH;
    }


    private get currentState(): MethodState {
        return this._currentState;
    }


    private set currentState(value: MethodState) {
        if (this._currentState !== value) {
            this._currentState.onLeave();
            this._currentState = value;
            this._currentState.onEnter();
        }
    }


    public constructor(
        method: Function,
        delay: number,
        callEdge: MethodCallEdge = MethodCallEdge.LEADING,
        maxWait: number = Infinity
    ) {
        this._method = method;
        this._delay = delay;
        this._callEdge = callEdge;
        this._maxWait = maxWait;

        this._normalState = new NormalState(this);
        this._throttlingState = new ThrottlingState(this);

        this._currentState = this._normalState;
    }


    public call(context: any, args: ArrayLike<any>): any {
        this._lastCall = new MethodCall(context, args);

        this.currentState.call();

        return this._lastReturnValue;
    }


    public release(): void {
        if (this._lastCall != null) {
            this._lastReturnValue = this._method.apply(this._lastCall.context, this._lastCall.args);
            delete this._lastCall;
        }
    }


    public enableThrottling(): void {
        this.currentState = this._throttlingState;
    }


    public disableThrottling(): void {
        this.currentState = this._normalState;
    }
}
