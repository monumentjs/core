import {CancellationSupport} from '../CancellationSupport';
import {DateTime} from '../time/DateTime';


export class EventArgs extends CancellationSupport {
    public static readonly EMPTY: EventArgs = new EventArgs();

    private readonly _timestamp: DateTime = DateTime.now;
    private _isCancellable: boolean = false;


    public get timestamp(): DateTime {
        return this._timestamp;
    }


    public get isCancellable(): boolean {
        return this._isCancellable;
    }


    protected setCancellable(value: boolean): void {
        this._isCancellable = value;
    }
}
