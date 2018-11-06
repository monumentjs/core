import {List} from '../List';
import {Sequence} from '../../../base/Sequence';
import {IteratorFunction} from '../../../base/IteratorFunction';
import {EqualityComparator} from '../../../../comparison/equality/EqualityComparator';
import {StrictEqualityComparator} from '../../../../comparison/equality/StrictEqualityComparator';
import {ObservableListProxy} from '../../observable/proxy/ObservableListProxy';


/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export abstract class ListProxy<T, TItems extends List<T>> extends ObservableListProxy<T, TItems> implements List<T> {
    public add(item: T): boolean {
        return this._items.add(item);
    }

    public addAll(items: Sequence<T>): boolean {
        return this._items.addAll(items);
    }

    public addIfAbsent(item: T): boolean;
    public addIfAbsent(item: T, comparator: EqualityComparator<T>): boolean;
    public addIfAbsent(item: T, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): boolean {
        return this._items.addIfAbsent(item);
    }

    public clear(): boolean {
        return this._items.clear();
    }

    public abstract clone(): List<T>;

    public insert(index: number, item: T): boolean {
        return this._items.insert(index, item);
    }

    public insertAll(index: number, items: Sequence<T>): boolean {
        return this._items.insertAll(index, items);
    }

    public remove(item: T): boolean;

    public remove(item: T, comparator: EqualityComparator<T>): boolean;

    public remove(item: T, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): boolean {
        return this._items.remove(item, comparator);
    }

    public removeAll(items: Sequence<T>): boolean;

    public removeAll(items: Sequence<T>, comparator: EqualityComparator<T>): boolean;

    public removeAll(items: Sequence<T>, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): boolean {
        return this._items.removeAll(items, comparator);
    }

    public removeAt(index: number): T {
        return this._items.removeAt(index);
    }

    public removeBy(predicate: IteratorFunction<T, boolean>): boolean {
        return this._items.removeBy(predicate);
    }

    public retainAll(items: Sequence<T>): boolean;

    public retainAll(items: Sequence<T>, comparator: EqualityComparator<T>): boolean;

    public retainAll(items: Sequence<T>, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): boolean {
        return this._items.retainAll(items, comparator);
    }

    public setAt(index: number, newValue: T): T {
        return this._items.setAt(index, newValue);
    }

}
