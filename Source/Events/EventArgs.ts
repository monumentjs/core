

export class EventArgs {
    private _isCancelled: boolean = false;

    protected _isCancellable: boolean = true;


    public get isCancellable(): boolean {
        return this._isCancellable;
    }


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
