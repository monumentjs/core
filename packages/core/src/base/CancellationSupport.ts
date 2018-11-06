import {Cancellable} from './Cancellable';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export abstract class CancellationSupport implements Cancellable {
    private readonly _isCancellable: boolean;
    private _isCancelled: boolean = false;

    public get isCancellable(): boolean {
        return this._isCancellable;
    }

    public get isCancelled(): boolean {
        return this._isCancelled;
    }

    public constructor(isCancellable: boolean) {
        this._isCancellable = isCancellable;
    }

    public cancel(): boolean {
        if (this.isCancellable) {
            this._isCancelled = true;
        }

        return this.isCancelled;
    }
}
