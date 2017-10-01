import {IEnumerable} from './Abstraction/IEnumerable';
import {Assert} from '../Assertion/Assert';
import {EqualityComparator} from '../Core/EqualityComparator';
import {IJSONSerializable} from '../Core/Abstraction/IJSONSerializable';
import {ICloneable} from '../Core/Abstraction/ICloneable';
import {IEquatable} from '../Core/Abstraction/IEquatable';
import {IEqualityComparator} from '../Core/Abstraction/IEqualityComparator';


export class Enumerable<T> implements IEnumerable<T>, IJSONSerializable<T[]>, ICloneable<Enumerable<T>>, IEquatable<IEnumerable<T>> {
    readonly [index: number]: T | undefined;


    private _length: number = 0;


    public get length(): number {
        return this._length;
    }


    public set length(value: number) {
        this.resize(value);
    }


    public get isEmpty(): boolean {
        return this.length === 0;
    }


    public constructor(list: Iterable<T> = []) {
        Array.prototype.splice.call(this, 0, 0, ...list);
    }


    public [Symbol.iterator](): Iterator<T> {
        return this.getIterator();
    }


    public getIterator(): Iterator<T> {
        let index: number = 0;

        return {
            next: (): IteratorResult<T> => {
                index += 1;

                return {
                    value: (index <= this.length ? this[index - 1] : undefined) as T,
                    done: index > this.length
                };
            }
        };
    }


    public clone(): Enumerable<T> {
        return new Enumerable(this);
    }


    public toJSON(): T[] {
        return this.toArray();
    }


    public toArray(): T[] {
        return Array.prototype.slice.call(this, 0);
    }


    public equals(
        otherList: IEnumerable<T>,
        comparator: IEqualityComparator<T> = EqualityComparator.instance
    ): boolean {
        if (this.length !== otherList.length) {
            return false;
        }

        if (this.isEmpty && otherList.length === 0) {
            return true;
        }

        let index: number = 0;

        for (let otherItem of otherList) {
            if (!comparator.equals(otherItem, this[index] as T)) {
                return false;
            }

            index++;
        }

        return true;
    }


    protected resize(value: number): void {
        Assert.argument('value', value).isLength();

        if (this._length !== value) {
            if (value < this._length) {
                for (let i = value; i < this._length; i++) {
                    delete (this as {[index: number]: T | undefined})[i];
                }
            }

            this._length = value;
        }
    }
}
