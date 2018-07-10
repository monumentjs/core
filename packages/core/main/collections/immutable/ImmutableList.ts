import {EqualityComparator} from '../../EqualityComparator';
import {IteratorFunction} from '../IteratorFunction';
import {ImmutableCollection} from './ImmutableCollection';
import {ReadOnlyList} from '../ReadOnlyList';


export interface ImmutableList<T> extends ImmutableCollection<T>, ReadOnlyList<T> {
    // Collection

    add(item: T): ImmutableList<T>;
    addAll(items: Iterable<T>): ImmutableList<T>;
    remove(item: T, comparator?: EqualityComparator<T>): ImmutableList<T>;
    removeAll(items: Iterable<T>, comparator?: EqualityComparator<T>): ImmutableList<T>;
    removeBy(predicate: IteratorFunction<T, boolean>): ImmutableList<T>;
    retainAll(items: Iterable<T>, comparator?: EqualityComparator<T>): ImmutableList<T>;
    clear(): ImmutableList<T>;

    // List

    setAt(index: number, newValue: T): ImmutableList<T>;
    insert(index: number, item: T): ImmutableList<T>;
    insertAll(index: number, items: Iterable<T>): ImmutableList<T>;
    removeAt(index: number): ImmutableList<T>;
}
