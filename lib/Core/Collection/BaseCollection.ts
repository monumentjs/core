

export abstract class BaseCollection<T> implements Iterable<T>, ArrayLike<T> {
    [index: number]: T;
    private _length: number = 0;


    get length(): number {
        return this._length;
    }


    set length(value: number) {
        if (value < this._length) {
            for (let i = value; i < this._length; i++) {
                delete this[i];
            }
        }

        this._length = value;
    }


    public [Symbol.iterator](): Iterator<T> {
        let index = 0;

        return {
            next: (): IteratorResult<T> => {
                index += 1;

                return {
                    value: index <= this._length ? this[index - 1] : undefined,
                    done: index > this._length
                };
            }
        };
    }
}
