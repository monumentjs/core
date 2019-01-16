import {ReadOnlyList} from '../readonly/ReadOnlyList';
import {EqualityComparator} from '../../../comparison/equality/EqualityComparator';
import {IteratorFunction} from '../../collection/readonly/ReadOnlyCollection';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @immutable
 * @readonly
 */
export interface ImmutableList<T> extends ReadOnlyList<T> {
    add(item: T): ImmutableList<T>;

    addAll(items: Iterable<T>): ImmutableList<T>;

    addIfAbsent(item: T): ImmutableList<T>;

    addIfAbsent(item: T, comparator: EqualityComparator<T>): ImmutableList<T>;

    clear(): ImmutableList<T>;

    insert(index: number, item: T): ImmutableList<T>;

    insertAll(index: number, items: Iterable<T>): ImmutableList<T>;

    remove(item: T): ImmutableList<T>;

    remove(item: T, comparator: EqualityComparator<T>): ImmutableList<T>;

    removeAll(items: Iterable<T>): ImmutableList<T>;

    removeAll(items: Iterable<T>, comparator: EqualityComparator<T>): ImmutableList<T>;

    removeAt(index: number): ImmutableList<T>;

    removeBy(predicate: IteratorFunction<T, boolean>): ImmutableList<T>;

    retainAll(items: Iterable<T>): ImmutableList<T>;

    retainAll(items: Iterable<T>, comparator: EqualityComparator<T>): ImmutableList<T>;

    setAt(index: number, newValue: T): ImmutableList<T>;
}
