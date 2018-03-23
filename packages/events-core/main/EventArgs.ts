import {CancellationSupport} from '@monument/core/main/CancellationSupport';


export class EventArgs extends CancellationSupport {
    protected _isCancellable: boolean = true;


    public get isCancellable(): boolean {
        return this._isCancellable;
    }
}
