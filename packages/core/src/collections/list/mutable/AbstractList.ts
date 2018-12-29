import {List} from './List';
import {CollectionUtils} from '../../base/CollectionUtils';
import {EqualityComparator} from '../../../comparison/equality/EqualityComparator';
import {StrictEqualityComparator} from '../../../comparison/equality/StrictEqualityComparator';
import {IndexOutOfBoundsException} from '../../../exceptions/IndexOutOfBoundsException';
import {RangeException} from '../../../exceptions/RangeException';
import {ReadOnlyCollectionImpl} from '../../collection/readonly/ReadOnlyCollectionImpl';
import {Sequence} from '../../base/Sequence';
import {ReadOnlyCollectionBase} from '../../collection/readonly/ReadOnlyCollectionBase';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @mutable
 */
export abstract class AbstractList<T> extends ReadOnlyCollectionBase<T> implements List<T> {
    public get firstIndex(): number {
        return this.isEmpty ? -1 : 0;
    }

    public get lastIndex(): number {
        return this.length - 1;
    }

    public abstract get length(): number;

    public abstract [Symbol.iterator](): Iterator<T>;

    public abstract add(item: T): boolean;

    public abstract addAll(items: Iterable<T>): boolean;

    public addIfAbsent(item: T): boolean;

    public addIfAbsent(item: T, comparator: EqualityComparator<T>): boolean;

    public addIfAbsent(item: T, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): boolean {
        if (this.contains(item, comparator)) {
            return false;
        }

        return this.add(item);
    }

    public clear(): boolean {
        if (this.isEmpty) {
            return false;
        }

        this.doClear();

        return true;
    }

    public abstract clone(): List<T>;

    public getAt(index: number): T {
        return new ReadOnlyCollectionImpl(this).getAt(index);
    }

    public indexOf(item: T): number;

    public indexOf(item: T, comparator: EqualityComparator<T>): number;

    public indexOf(item: T, comparator: EqualityComparator<T>, startIndex: number): number;

    public indexOf(item: T, comparator: EqualityComparator<T>, startIndex: number, count: number): number;

    public indexOf(
        item: T,
        comparator: EqualityComparator<T> = StrictEqualityComparator.get(),
        startIndex: number = 0,
        count: number = this.length - startIndex
    ): number {
        CollectionUtils.validateSliceBounds(this, startIndex, count);

        let result: number = -1;

        this.forEach((ownItem: T, index: number) => {
            if (comparator.equals(ownItem, item)) {
                result = index;

                return false;
            }
        }, startIndex, count);

        return result;
    }

    public insert(index: number, item: T): boolean {
        CollectionUtils.validateIndex(index);

        if (index > this.length) {
            throw new IndexOutOfBoundsException(`Index=${index}, length=${this.length}`);
        }

        this.doInsert(index, item);

        return true;
    }

    public insertAll(index: number, items: Sequence<T>): boolean {
        CollectionUtils.validateIndex(index);

        if (index > this.length) {
            throw new IndexOutOfBoundsException(`Index=${index}, length=${this.length}`);
        }

        const items$: ReadOnlyCollectionImpl<T> = new ReadOnlyCollectionImpl(items);

        if (items$.isEmpty) {
            return false;
        }

        this.doInsertAll(index, items);

        return true;
    }

    public lastIndexOf(item: T): number;

    public lastIndexOf(item: T, comparator: EqualityComparator<T>): number;

    public lastIndexOf(item: T, comparator: EqualityComparator<T>, startIndex: number): number;

    public lastIndexOf(item: T, comparator: EqualityComparator<T>, startIndex: number, count: number): number;

    public lastIndexOf(
        item: T,
        comparator: EqualityComparator<T> = StrictEqualityComparator.get(),
        startIndex: number = Math.max(this.length - 1, 0),
        count: number = startIndex + (this.length ? 1 : 0)
    ): number {
        if (startIndex !== 0) {
            CollectionUtils.validateIndexBounds(this, startIndex);
        }

        if (count < 0 || count > this.length) {
            throw new RangeException(`Scan range length is not valid. Value=${count}`);
        }

        let result: number = -1;

        this.forEachBack((ownItem: T, index: number) => {
            if (comparator.equals(item, ownItem)) {
                result = index;

                return false;
            }
        }, startIndex, count);

        return result;
    }

    public abstract remove(item: T): boolean;

    public abstract remove(item: T, comparator: EqualityComparator<T>): boolean;

    public removeAll(items: Iterable<T>): boolean;

    public removeAll(items: Iterable<T>, comparator: EqualityComparator<T>): boolean;

    public removeAll(items: Iterable<T>, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): boolean {
        const items$: ReadOnlyCollectionImpl<T> = new ReadOnlyCollectionImpl(items);

        if (items$.isEmpty) {
            return false;
        }

        return this.removeBy((ownItem: T): boolean => {
            return items$.contains(ownItem, comparator);
        });
    }

    public removeAt(index: number): T {
        CollectionUtils.validateIndexBounds(this, index);

        return this.doRemoveAt(index);
    }

    public abstract removeBy(predicate: (item: T, index: number) => boolean): boolean;

    public retainAll(items: Iterable<T>): boolean;

    public retainAll(items: Iterable<T>, comparator: EqualityComparator<T>): boolean;

    public retainAll(items: Iterable<T>, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): boolean {
        return this.removeBy((currentItem: T) => {
            for (const otherItem of items) {
                if (comparator.equals(currentItem, otherItem)) {
                    return false;
                }
            }

            return true;
        });
    }

    public setAt(index: number, newValue: T): T {
        CollectionUtils.validateIndexBounds(this, index);

        return this.doSetAt(index, newValue);
    }

    protected abstract create<I>(items?: Sequence<I>): AbstractList<I>;

    protected abstract doClear(): void;

    protected abstract doInsert(index: number, item: T): void;

    protected abstract doInsertAll(index: number, items: Sequence<T>): void;

    protected abstract doRemoveAt(index: number): T;

    protected abstract doSetAt(index: number, newValue: T): T;
}
