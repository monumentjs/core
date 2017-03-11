import {IEnumerable} from './IEnumerable';


export default class Enumerable<T> implements IEnumerable<T>, ArrayLike<T> {
    [index: number]: T;


    private _length: number = 0;


    public get length(): number {
        return this._length;
    }


    public set length(newLength: number) {
        if (newLength < this._length) {
            for (let i = newLength; i < this._length; i++) {
                delete this[i];
            }
        }
    
        this._length = newLength;
    }
    
    
    public constructor(list: Iterable<T> = []) {
        Array.prototype.splice.call(this, 0, 0, ...list);
    }
    
    
    public [Symbol.iterator](): Iterator<T> {
        return this.getIterator();
    }
    
    
    public getIterator(): Iterator<T> {
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
    
    
    public toArray(): T[] {
        return Array.prototype.slice.call(this, 0);
    }
}
