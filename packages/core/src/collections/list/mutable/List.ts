import {IteratorFunction} from '../../base/IteratorFunction';
import {Sequence} from '../../base/Sequence';
import {EqualityComparator} from '../../../comparison/equality/EqualityComparator';
import {ObservableList} from '../observable/ObservableList';
import {Cloneable} from '../../../base/Cloneable';


/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface List<T> extends ObservableList<T>, Cloneable<List<T>> {
    add(item: T): boolean;

    addAll(items: Sequence<T>): boolean;

    addIfAbsent(item: T): boolean;

    addIfAbsent(item: T, comparator: EqualityComparator<T>): boolean;

    clear(): boolean;

    clone(): List<T>;

    insert(index: number, item: T): boolean;

    insertAll(index: number, items: Sequence<T>): boolean;

    remove(item: T): boolean;

    remove(item: T, comparator: EqualityComparator<T>): boolean;

    removeAll(items: Sequence<T>): boolean;

    removeAll(items: Sequence<T>, comparator: EqualityComparator<T>): boolean;

    removeAt(index: number): T;

    removeBy(predicate: IteratorFunction<T, boolean>): boolean;

    retainAll(items: Sequence<T>): boolean;

    retainAll(items: Sequence<T>, comparator: EqualityComparator<T>): boolean;

    setAt(index: number, newValue: T): T;
}
