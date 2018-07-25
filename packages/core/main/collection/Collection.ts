import {EqualityComparator} from '../EqualityComparator';
import {IteratorFunction} from './IteratorFunction';
import {ReadOnlyCollection} from './ReadOnlyCollection';
import {Sequence} from './Sequence';


export interface Collection<T> extends ReadOnlyCollection<T> {
    add(item: T): boolean;

    addAll(items: Sequence<T>): boolean;

    clear(): boolean;

    remove(item: T): boolean;

    remove(item: T, comparator: EqualityComparator<T>): boolean;

    removeAll(items: Sequence<T>): boolean;

    removeAll(items: Sequence<T>, comparator: EqualityComparator<T>): boolean;

    removeBy(predicate: IteratorFunction<T, boolean>): boolean;

    retainAll(items: Sequence<T>): boolean;

    retainAll(items: Sequence<T>, comparator: EqualityComparator<T>): boolean;
}

