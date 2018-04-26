import {Cancellable} from '@monument/core/main/Cancellable';
import {Exception} from '@monument/core/main/exceptions/Exception';


export class CancellationToken implements Cancellable {
    private _isCancelled: boolean = false;
    private _exceptionToThrow?: Exception;


    public get isCancelled(): boolean {
        return this._isCancelled;
    }


    public get exceptionToThrow(): Exception | undefined {
        return this._exceptionToThrow;
    }


    public cancel(exceptionToThrow?: Exception): boolean {
        if (this.isCancelled) {
            return false;
        }

        this._isCancelled = true;

        if (exceptionToThrow != null) {
            this._exceptionToThrow = exceptionToThrow;
        }

        return this.isCancelled;
    }
}
