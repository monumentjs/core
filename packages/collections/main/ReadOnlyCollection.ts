import {EqualityComparator} from '../../core/main/EqualityComparator';
import {Enumerable} from './Enumerable';
import {Countable} from './Countable';


export interface ReadOnlyCollection<T> extends Enumerable<T>, Countable {
    readonly isEmpty: boolean;

    contains(item: T, comparator?: EqualityComparator<T>): boolean;
    containsAll(items: Iterable<T>, comparator?: EqualityComparator<T>): boolean;
    toArray(): T[];
}
