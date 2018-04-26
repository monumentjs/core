import {CancellationSupport} from '@monument/core/main/CancellationSupport';


export class EventArgs extends CancellationSupport {
    public static readonly EMPTY: EventArgs = new EventArgs();


    private _isCancellable: boolean = true;


    public get isCancellable(): boolean {
        return this._isCancellable;
    }


    protected setCancellable(value: boolean): void {
        this._isCancellable = value;
    }
}
