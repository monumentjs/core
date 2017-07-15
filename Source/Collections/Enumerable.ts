import {IEnumerable} from './IEnumerable';
import {Assert} from '../Assertion/Assert';
import {ICloneable, IJSONSerializable} from '../types';


export class Enumerable<T>
    implements IEnumerable<T>, IJSONSerializable<T[]>, ICloneable<Enumerable<T>>, ArrayLike<T> {
    [index: number]: T;


    private _length: number = 0;


    public get length(): number {
        return this._length;
    }


    public set length(value: number) {
        Assert.argument('value', value).notNull().isLength();

        if (value < this._length) {
            for (let i = value; i < this._length; i++) {
                delete this[i];
            }
        }

        this._length = value;
    }


    public constructor(list: Iterable<T> = []) {
        Assert.argument('list', list).notNull();

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
                    value: index <= this.length ? this[index - 1] : undefined,
                    done: index > this.length
                };
            }
        };
    }


    public clone(): Enumerable<T> {
        return new Enumerable(this);
    }


    public toEnumerable(): Enumerable<T> {
        return new Enumerable(this);
    }


    public toJSON(): T[] {
        return this.toArray();
    }


    public toArray(): T[] {
        return Array.prototype.slice.call(this, 0);
    }
}
