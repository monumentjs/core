import {EqualityComparator} from '../../core/main/EqualityComparator';
import {IteratorFunction} from './IteratorFunction';
import {ReadOnlyCollection} from './ReadOnlyCollection';


export interface Collection<T> extends ReadOnlyCollection<T> {
    add(item: T): boolean;
    addAll(items: Iterable<T>): boolean;
    remove(item: T, comparator?: EqualityComparator<T>): boolean;
    removeAll(items: Iterable<T>, comparator?: EqualityComparator<T>): boolean;
    removeBy(predicate: IteratorFunction<T, boolean>): boolean;
    retainAll(items: Iterable<T>, comparator?: EqualityComparator<T>): boolean;
    clear(): boolean;
}

