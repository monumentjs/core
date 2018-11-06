import {ReadOnlyList} from '../readonly/ReadOnlyList';
import {Sequence} from '../../base/Sequence';
import {IteratorFunction} from '../../base/IteratorFunction';
import {Cloneable} from '../../../base/Cloneable';
import {EqualityComparator} from '../../../comparison/equality/EqualityComparator';


/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface ImmutableList<T> extends ReadOnlyList<T>, Cloneable<ImmutableList<T>> {
    add(item: T): ImmutableList<T>;

    addAll(items: Sequence<T>): ImmutableList<T>;

    addIfAbsent(item: T): ImmutableList<T>;

    addIfAbsent(item: T, comparator: EqualityComparator<T>): ImmutableList<T>;

    clear(): ImmutableList<T>;

    clone(): ImmutableList<T>;

    insert(index: number, item: T): ImmutableList<T>;

    insertAll(index: number, items: Sequence<T>): ImmutableList<T>;

    remove(item: T): ImmutableList<T>;

    remove(item: T, comparator: EqualityComparator<T>): ImmutableList<T>;

    removeAll(items: Sequence<T>): ImmutableList<T>;

    removeAll(items: Sequence<T>, comparator: EqualityComparator<T>): ImmutableList<T>;

    removeAt(index: number): ImmutableList<T>;

    removeBy(predicate: IteratorFunction<T, boolean>): ImmutableList<T>;

    retainAll(items: Sequence<T>): ImmutableList<T>;

    retainAll(items: Sequence<T>, comparator: EqualityComparator<T>): ImmutableList<T>;

    setAt(index: number, newValue: T): ImmutableList<T>;
}
