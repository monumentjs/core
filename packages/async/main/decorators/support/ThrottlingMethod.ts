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
    protected method: ThrottlingMethod;


    public abstract get isThrottling(): boolean;


    public constructor(method: ThrottlingMethod) {
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
    private _timeoutId: any;


    public get isThrottling(): boolean {
        return true;
    }


    public call(): void {
        // Do nothing
    }

    // State change hooks

    public onEnter(): void {
        if (this.method.canCallOnLeadingEdge) {
            this.method.release();
        }

        this.scheduleThrottlingCancellation();
    }


    public onLeave(): void {
        if (this.method.canCallOnTrailingEdge) {
            this.method.release();
        }

        this.abortThrottlingCancellation();
    }

    // Throttling timeout

    private scheduleThrottlingCancellation(): void {
        this._timeoutId = setTimeout(() => {
            this.method.disableThrottling();
        }, this.method.delay);
    }


    private abortThrottlingCancellation(): void {
        clearTimeout(this._timeoutId);

        delete this._timeoutId;
    }
}


export class ThrottlingMethod {
    private _normalState: MethodState;
    private _throttlingState: MethodState;
    private _currentState: MethodState;

    private _lastCall: MethodCall | undefined;
    private _lastReturnValue: any;

    private _method: Function;
    private _delay: number;
    private _callEdge: MethodCallEdge;


    public get isThrottling(): boolean {
        return this.currentState.isThrottling;
    }


    public get delay(): number {
        return this._delay;
    }


    public get canCallOnLeadingEdge(): boolean {
        return this._callEdge === MethodCallEdge.Leading || this._callEdge === MethodCallEdge.Both;
    }


    public get canCallOnTrailingEdge(): boolean {
        return this._callEdge === MethodCallEdge.Trailing || this._callEdge === MethodCallEdge.Both;
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
        callEdge: MethodCallEdge = MethodCallEdge.Leading
    ) {
        this._method = method;
        this._delay = delay;
        this._callEdge = callEdge;

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
