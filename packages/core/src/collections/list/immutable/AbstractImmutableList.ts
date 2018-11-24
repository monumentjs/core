import {ImmutableList} from './ImmutableList';
import {Sequence} from '../../base/Sequence';
import {IteratorFunction} from '../../base/IteratorFunction';
import {Cloneable} from '../../../base/Cloneable';
import {ReadOnlyListProxy} from '../readonly/proxy/ReadOnlyListProxy';
import {List} from '../mutable/List';
import {EqualityComparator} from '../../../comparison/equality/EqualityComparator';
import {StrictEqualityComparator} from '../../../comparison/equality/StrictEqualityComparator';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @immutable
 */
export abstract class AbstractImmutableList<T>
    extends ReadOnlyListProxy<T, List<T>>
    implements ImmutableList<T>, Cloneable<ImmutableList<T>> {

    protected constructor(list: List<T>) {
        super(list);
    }

    public add(item: T): ImmutableList<T> {
        return this.create(this._items.concat([item]));
    }

    public addAll(items: Sequence<T>): ImmutableList<T> {
        if (items.length === 0) {
            return this;
        }

        return this.create(this._items.concat(items));
    }

    public addIfAbsent(item: T): ImmutableList<T> {
        if (this.contains(item)) {
            return this;
        }

        return this.add(item);
    }

    public clear(): ImmutableList<T> {
        if (this.isEmpty) {
            return this;
        }

        return this.create();
    }

    public clone(): ImmutableList<T> {
        return this.create(this);
    }

    public insert(index: number, item: T): ImmutableList<T> {
        const list: List<T> = this._items.clone();

        list.insert(index, item);

        return this.create(list);
    }

    public insertAll(index: number, items: Sequence<T>): ImmutableList<T> {
        if (items.length === 0) {
            return this;
        }

        const list: List<T> = this._items.clone();

        list.insertAll(index, items);

        return this.create(list);
    }

    public remove(item: T): ImmutableList<T>;
    public remove(item: T, comparator: EqualityComparator<T>): ImmutableList<T>;
    public remove(item: T, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): ImmutableList<T> {
        const list: List<T> = this._items.clone();

        if (list.remove(item, comparator)) {
            return this.create(list);
        }

        return this;
    }

    public removeAll(items: Sequence<T>): ImmutableList<T>;
    public removeAll(items: Sequence<T>, comparator: EqualityComparator<T>): ImmutableList<T>;
    public removeAll(items: Sequence<T>, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): ImmutableList<T> {
        if (items.length === 0) {
            return this;
        }

        const list: List<T> = this._items.clone();

        if (list.removeAll(items, comparator)) {
            return this.create(list);
        }

        return this;
    }

    public removeAt(index: number): ImmutableList<T> {
        const list: List<T> = this._items.clone();

        list.removeAt(index);

        return this.create(list);
    }

    public removeBy(predicate: IteratorFunction<T, boolean>): ImmutableList<T> {
        const list: List<T> = this._items.clone();

        if (list.removeBy(predicate)) {
            return this.create(list);
        }

        return this;
    }

    public retainAll(items: Sequence<T>): ImmutableList<T>;
    public retainAll(items: Sequence<T>, comparator: EqualityComparator<T>): ImmutableList<T>;
    public retainAll(items: Sequence<T>, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): ImmutableList<T> {
        const list: List<T> = this._items.clone();

        if (list.retainAll(items, comparator)) {
            return this.create(list);
        }

        return this;
    }

    public setAt(index: number, newValue: T): ImmutableList<T> {
        const list: List<T> = this._items.clone();

        list.setAt(index, newValue);

        return this.create(list);
    }

    protected abstract create<I>(items?: Sequence<I>): ImmutableList<I>;
}
