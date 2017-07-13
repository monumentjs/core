export interface IEnumerable<T> extends Iterable<T> {
    [index: number]: T;
    length: number;
    getIterator?(): Iterator<T>;
}
