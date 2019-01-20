import {Cloneable} from '../../../base/Cloneable';
import {ImmutableList} from './ImmutableList';
import {ReadOnlyCollectionBase} from '../../collection/readonly/ReadOnlyCollectionBase';
import {EqualityComparator} from '../../../comparison/equality/EqualityComparator';
import {IteratorFunction} from '../../function/IteratorFunction';
import {ReferenceEqualityComparator} from '../../../comparison/equality/ReferenceEqualityComparator';
import {ArrayList} from '../mutable/ArrayList';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @immutable
 */
export class ImmutableArrayList<T> extends ReadOnlyCollectionBase<T> implements ImmutableList<T>, Cloneable<ImmutableArrayList<T>> {
    private readonly _items: ArrayList<T>;

    public get firstIndex(): number {
        return this._items.firstIndex;
    }

    public get lastIndex(): number {
        return this._items.lastIndex;
    }

    public get length(): number {
        return this._items.length;
    }

    public constructor(items?: Iterable<T>) {
        super();
        this._items = new ArrayList(items);
    }

    public [Symbol.iterator](): Iterator<T> {
        return this._items[Symbol.iterator]();
    }

    public add(item: T): ImmutableList<T> {
        const copy: ImmutableArrayList<T> = this.clone();

        copy._items.add(item);

        return copy;
    }

    public addAll(items: Iterable<T>): ImmutableList<T> {
        const copy: ImmutableArrayList<T> = this.clone();

        if (copy._items.addAll(items)) {
            return copy;
        }

        return this;
    }

    public addIfAbsent(item: T): ImmutableList<T>;
    public addIfAbsent(item: T, comparator: EqualityComparator<T>): ImmutableList<T>;
    public addIfAbsent(item: T, comparator: EqualityComparator<T> = ReferenceEqualityComparator.get()): ImmutableList<T> {
        const copy: ImmutableArrayList<T> = this.clone();

        if (copy._items.addIfAbsent(item, comparator)) {
            return copy;
        }

        return this;
    }

    public clear(): ImmutableList<T> {
        if (this.isEmpty) {
            return this;
        }

        return new ImmutableArrayList();
    }

    public clone(): ImmutableArrayList<T> {
        return new ImmutableArrayList<T>(this._items);
    }

    public getAt(index: number): T {
        return this._items.getAt(index);
    }

    public indexOf(item: T): number;

    public indexOf(item: T, comparator: EqualityComparator<T>): number;

    public indexOf(item: T, startIndex: number): number;

    public indexOf(item: T, startIndex: number, comparator: EqualityComparator<T>): number;

    public indexOf(item: T, startIndex: number, count: number): number;

    public indexOf(item: T, startIndex: number, count: number, comparator: EqualityComparator<T>): number;

    public indexOf(
        item: T,
        startIndex?: number | EqualityComparator<T>,
        count?: number | EqualityComparator<T>,
        comparator?: EqualityComparator<T>
    ): number {
        // @ts-ignore
        return this._items.indexOf(item, startIndex, count, comparator);
    }

    public insert(index: number, item: T): ImmutableList<T> {
        const copy: ImmutableArrayList<T> = this.clone();

        copy._items.insert(index, item);

        return copy;
    }

    public insertAll(index: number, items: Iterable<T>): ImmutableList<T> {
        const copy: ImmutableArrayList<T> = this.clone();

        if (copy._items.insertAll(index, items)) {
            return copy;
        }

        return this;
    }

    public lastIndexOf(item: T): number;

    public lastIndexOf(item: T, comparator: EqualityComparator<T>): number;

    public lastIndexOf(item: T, startIndex: number): number;

    public lastIndexOf(item: T, startIndex: number, comparator: EqualityComparator<T>): number;

    public lastIndexOf(item: T, startIndex: number, count: number): number;

    public lastIndexOf(item: T, startIndex: number, count: number, comparator: EqualityComparator<T>): number;

    public lastIndexOf(
        item: T,
        startIndex?: number | EqualityComparator<T>,
        count?: number | EqualityComparator<T>,
        comparator?: EqualityComparator<T>
    ): number {
        // @ts-ignore
        return this._items.lastIndexOf(item, startIndex, count, comparator);
    }

    public remove(item: T): ImmutableList<T>;
    public remove(item: T, comparator: EqualityComparator<T>): ImmutableList<T>;
    public remove(item: T, comparator: EqualityComparator<T> = ReferenceEqualityComparator.get()): ImmutableList<T> {
        const copy: ImmutableArrayList<T> = this.clone();

        if (copy._items.remove(item, comparator)) {
            return copy;
        }

        return this;
    }

    public removeAll(items: Iterable<T>): ImmutableList<T>;
    public removeAll(items: Iterable<T>, comparator: EqualityComparator<T>): ImmutableList<T>;
    public removeAll(items: Iterable<T>, comparator: EqualityComparator<T> = ReferenceEqualityComparator.get()): ImmutableList<T> {
        const copy: ImmutableArrayList<T> = this.clone();

        if (copy._items.removeAll(items, comparator)) {
            return copy;
        }

        return this;
    }

    public removeAt(index: number): ImmutableList<T> {
        const copy: ImmutableArrayList<T> = this.clone();

        copy._items.removeAt(index);

        return copy;
    }

    public removeBy(predicate: IteratorFunction<T, boolean>): ImmutableList<T> {
        const copy: ImmutableArrayList<T> = this.clone();

        if (copy._items.removeBy(predicate)) {
            return copy;
        }

        return this;
    }

    public retainAll(items: Iterable<T>): ImmutableList<T>;
    public retainAll(items: Iterable<T>, comparator: EqualityComparator<T>): ImmutableList<T>;
    public retainAll(items: Iterable<T>, comparator: EqualityComparator<T> = ReferenceEqualityComparator.get()): ImmutableList<T> {
        const copy: ImmutableArrayList<T> = this.clone();

        if (copy._items.retainAll(items, comparator)) {
            return copy;
        }

        return this;
    }

    public setAt(index: number, newValue: T): ImmutableList<T> {
        const copy: ImmutableArrayList<T> = this.clone();

        copy._items.setAt(index, newValue);

        return copy;
    }
}
