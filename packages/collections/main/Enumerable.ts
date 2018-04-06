import {IteratorFunction} from './IteratorFunction';


export interface Enumerable<T> extends Iterable<T> {
    getIterator(): Iterator<T>;

    forEach(iterator: IteratorFunction<T, boolean | void>, startIndex?: number, count?: number): void;
    forEachReversed(iterator: IteratorFunction<T, boolean | void>, startIndex?: number, count?: number): void;
}
