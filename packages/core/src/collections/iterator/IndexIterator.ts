
/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class IndexIterator implements IterableIterator<number> {
    private _index: number;
    private readonly _to: number;
    private readonly _step: number;

    public get isDone(): boolean {
        if (this._step < 0) {
            return this._index < this._to;
        } else {
            return this._index > this._to;
        }
    }

    public constructor(to: number, index: number = 0, step: number = 1) {
        this._index = index;
        this._to = to;
        this._step = step;
    }

    public [Symbol.iterator](): IterableIterator<number> {
        return this;
    }

    public next(): IteratorResult<number> {
        this._index += this._step;

        return {
            value: this._index,
            done: this.isDone
        };
    }
}
