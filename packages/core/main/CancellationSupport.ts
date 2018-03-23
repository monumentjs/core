import {Cancellable} from './Cancellable';


export abstract class CancellationSupport implements Cancellable {
    private _isCancelled: boolean = false;


    public abstract get isCancellable(): boolean;


    public get isCancelled(): boolean {
        return this._isCancelled;
    }


    public cancel(): boolean {
        if (this.isCancellable) {
            this._isCancelled = true;
        }

        return this.isCancelled;
    }
}
