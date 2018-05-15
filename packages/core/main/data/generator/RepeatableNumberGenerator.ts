

export class RepeatableNumberGenerator {
    private readonly _max: number;
    private _index: number = 0;


    public constructor(max: number = Number.MAX_SAFE_INTEGER) {
        this._max = max;
    }


    public next(): number {
        if (this._index < this._max) {
            this._index++;
        } else {
            this._index = 0;
        }

        return this._index;
    }
}
