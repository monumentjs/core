import {EqualityComparator} from '../../utils/comparison/EqualityComparator';
import {Sequence} from './Sequence';
import {Enumerable} from './Enumerable';


export interface ReadOnlyCollection<T> extends Enumerable<T> {
    contains(item: T): boolean;

    contains(item: T, comparator: EqualityComparator<T>): boolean;

    containsAll(items: Sequence<T>): boolean;

    containsAll(items: Sequence<T>, comparator: EqualityComparator<T>): boolean;
}
