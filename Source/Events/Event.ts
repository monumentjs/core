

export class Event {
    private _type: string;
    private _isCancelled: boolean = false;
    private _isCancellable: boolean;


    public get type(): string {
        return this._type;
    }


    public get isCancellable(): boolean {
        return this._isCancellable;
    }


    public get isCancelled(): boolean {
        return this._isCancelled;
    }


    public constructor(type: string, cancellable: boolean = true) {
        this._type = type;
        this._isCancellable = cancellable;
    }


    public cancel(): boolean {
        if (this.isCancellable && !this.isCancelled) {
            this._isCancelled = true;

            return true;
        }

        return false;
    }
}
