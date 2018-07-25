import {Sequence} from './Sequence';
import {IteratorFunction} from './IteratorFunction';


export interface Enumerable<T> extends Sequence<T> {
    readonly isEmpty: boolean;

    forEach(iterator: IteratorFunction<T, boolean | void>): void;

    forEach(iterator: IteratorFunction<T, boolean | void>, startIndex: number): void;

    forEach(iterator: IteratorFunction<T, boolean | void>, startIndex: number, count: number): void;

    forEachReversed(iterator: IteratorFunction<T, boolean | void>): void;

    forEachReversed(iterator: IteratorFunction<T, boolean | void>, startIndex: number): void;

    forEachReversed(iterator: IteratorFunction<T, boolean | void>, startIndex: number, count: number): void;

    toArray(): T[];
}
