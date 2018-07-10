import {EqualityComparator} from '../../EqualityComparator';
import {ReadOnlyCollection} from '../ReadOnlyCollection';
import {IteratorFunction} from '../IteratorFunction';


export interface ImmutableCollection<T> extends ReadOnlyCollection<T> {
    add(item: T): ImmutableCollection<T>;
    addAll(items: Iterable<T>): ImmutableCollection<T>;
    remove(item: T, comparator?: EqualityComparator<T>): ImmutableCollection<T>;
    removeAll(items: Iterable<T>, comparator?: EqualityComparator<T>): ImmutableCollection<T>;
    removeBy(predicate: IteratorFunction<T, boolean>): ImmutableCollection<T>;
    retainAll(items: Iterable<T>, comparator?: EqualityComparator<T>): ImmutableCollection<T>;
    clear(): ImmutableCollection<T>;
}
