

export class CancellationToken {
    private _isCancellationRequested: boolean = false;


    public get isCancellationRequested(): boolean {
        return this._isCancellationRequested;
    }


    public cancel(): void {
        this._isCancellationRequested = true;
    }
}
