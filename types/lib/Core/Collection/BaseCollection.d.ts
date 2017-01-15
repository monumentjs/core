export declare abstract class BaseCollection<T> implements Iterable<T>, ArrayLike<T> {
    [index: number]: T;
    private _length;
    length: number;
    [Symbol.iterator](): Iterator<T>;
}
