import { IEnumerable } from './IEnumerable';
import { ICloneable, IJSONSerializable } from '../types';
export declare class Enumerable<T> implements IEnumerable<T>, IJSONSerializable<T[]>, ICloneable<Enumerable<T>>, ArrayLike<T> {
    [index: number]: T;
    private _length;
    length: number;
    constructor(list?: Iterable<T>);
    [Symbol.iterator](): Iterator<T>;
    getIterator(): Iterator<T>;
    clone(): Enumerable<T>;
    toEnumerable(): Enumerable<T>;
    toJSON(): T[];
    toArray(): T[];
}
