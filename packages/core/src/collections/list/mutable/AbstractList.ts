import {List} from './List';
import {IteratorFunction} from '../../base/IteratorFunction';
import {CollectionUtils} from '../../base/CollectionUtils';
import {AggregateFunction} from '../../base/AggregateFunction';
import {Queryable} from '../../base/Queryable';
import {Grouping} from '../../base/Grouping';
import {CombineFunction} from '../../base/CombineFunction';
import {SelectorFunction} from '../../base/SelectorFunction';
import {EqualityComparator} from '../../../comparison/equality/EqualityComparator';
import {StrictEqualityComparator} from '../../../comparison/equality/StrictEqualityComparator';
import {IndexOutOfBoundsException} from '../../../exceptions/IndexOutOfBoundsException';
import {RangeException} from '../../../exceptions/RangeException';
import {SortOrder} from '../../../comparison/order/SortOrder';
import {Comparator} from '../../../comparison/order/Comparator';
import {QueryableImpl} from '../../base/QueryableImpl';
import {Sequence} from '../../base/Sequence';
import {EventArgs} from '../../../events/EventArgs';


/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @mutable
 */
export abstract class AbstractList<T> implements List<T> {
    public get firstIndex(): number {
        return this.isEmpty ? -1 : 0;
    }

    public get isEmpty(): boolean {
        return this.length === 0;
    }

    public get lastIndex(): number {
        return this.length - 1;
    }

    public abstract get length(): number;

    public abstract [Symbol.iterator](): Iterator<T>;

    public add(item: T): boolean {
        this.doAdd(item);

        return true;
    }

    public addAll(items: Sequence<T>): boolean {
        if (items.length === 0) {
            return false;
        }

        this.doAddAll(items);

        return true;
    }

    public addIfAbsent(item: T): boolean;

    public addIfAbsent(item: T, comparator: EqualityComparator<T>): boolean;

    public addIfAbsent(item: T, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): boolean {
        if (this.contains(item, comparator)) {
            return false;
        }

        return this.add(item);
    }

    public aggregate<TAggregate>(
        iterator: AggregateFunction<T, TAggregate>,
        initialSeed: TAggregate
    ): TAggregate {
        return new QueryableImpl(this).aggregate(iterator, initialSeed);
    }

    public all(predicate: IteratorFunction<T, boolean>): boolean {
        return new QueryableImpl(this).all(predicate);
    }

    public any(predicate: IteratorFunction<T, boolean>): boolean {
        return new QueryableImpl(this).any(predicate);
    }

    public average(selector: IteratorFunction<T, number>): number {
        return new QueryableImpl(this).average(selector);
    }

    public clear(): boolean {
        if (this.isEmpty) {
            return false;
        }

        this.doClear();

        return true;
    }

    public abstract clone(): List<T>;

    public concat(otherList: Sequence<T>): Queryable<T> {
        return new QueryableImpl(this).concat(otherList);
    }

    public contains(otherItem: T): boolean;

    public contains(otherItem: T, comparator: EqualityComparator<T>): boolean;

    public contains(otherItem: T, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): boolean {
        return new QueryableImpl(this).contains(otherItem, comparator);
    }

    public containsAll(items: Sequence<T>): boolean;

    public containsAll(items: Sequence<T>, comparator: EqualityComparator<T>): boolean;

    public containsAll(items: Sequence<T>, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): boolean {
        return new QueryableImpl(this).containsAll(items, comparator);
    }

    public count(predicate: IteratorFunction<T, boolean>): number {
        return new QueryableImpl(this).count(predicate);
    }

    /**
     * Returns distinct elements from a sequence by using a specified EqualityComparator to compare values.
     */
    public distinct(): Queryable<T>;

    public distinct(comparator: EqualityComparator<T>): Queryable<T>;

    public distinct(comparator: EqualityComparator<T> = StrictEqualityComparator.get()): Queryable<T> {
        return new QueryableImpl(this).distinct(comparator);
    }

    public equals(otherList: Sequence<T>): boolean;

    public equals(otherList: Sequence<T>, comparator: EqualityComparator<T>): boolean;

    public equals(otherList: Sequence<T>, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): boolean {
        return new QueryableImpl(this).equals(otherList, comparator);
    }

    public except(otherList: Sequence<T>): Queryable<T>;

    public except(otherList: Sequence<T>, comparator: EqualityComparator<T>): Queryable<T>;

    public except(otherList: Sequence<T>, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): Queryable<T> {
        return new QueryableImpl(this).except(otherList, comparator);
    }

    public findAll(predicate: IteratorFunction<T, boolean>): Queryable<T> {
        return new QueryableImpl(this).findAll(predicate);
    }

    public first(predicate: IteratorFunction<T, boolean>): T | undefined;

    public first(predicate: IteratorFunction<T, boolean>, defaultValue: T): T;

    public first(predicate: IteratorFunction<T, boolean>, defaultValue?: T): T | undefined {
        if (defaultValue === undefined) {
            return new QueryableImpl(this).first(predicate);
        }

        return new QueryableImpl(this).first(predicate, defaultValue);
    }

    public firstOrDefault(defaultValue: T): T {
        return new QueryableImpl(this).firstOrDefault(defaultValue);
    }

    public forEach(iterator: IteratorFunction<T, false | void>): void;

    public forEach(iterator: IteratorFunction<T, false | void>, startIndex: number): void;

    public forEach(iterator: IteratorFunction<T, false | void>, startIndex: number, count: number): void;

    public forEach(iterator: IteratorFunction<T, false | void>, startIndex: number = 0, count: number = this.length - startIndex): void {
        new QueryableImpl(this).forEach(iterator, startIndex, count);
    }

    public forEachBack(iterator: IteratorFunction<T, false | void>): void;

    public forEachBack(iterator: IteratorFunction<T, false | void>, startIndex: number): void;

    public forEachBack(iterator: IteratorFunction<T, false | void>, startIndex: number, count: number): void;

    public forEachBack(
        iterator: IteratorFunction<T, false | void>,
        startIndex: number = Math.max(this.length - 1, 0),
        count: number = startIndex + (this.length ? 1 : 0)
    ): void {
        new QueryableImpl(this).forEachBack(iterator, startIndex, count);
    }

    public getAt(index: number): T {
        return new QueryableImpl(this).getAt(index);
    }

    public groupBy<TKey>(
        keySelector: IteratorFunction<T, TKey>
    ): Queryable<Grouping<TKey, T>>;

    public groupBy<TKey>(
        keySelector: IteratorFunction<T, TKey>,
        keyComparator: EqualityComparator<TKey>
    ): Queryable<Grouping<TKey, T>>;

    public groupBy<TKey>(
        keySelector: IteratorFunction<T, TKey>,
        keyComparator: EqualityComparator<TKey> = StrictEqualityComparator.get()
    ): Queryable<Grouping<TKey, T>> {
        return new QueryableImpl(this).groupBy(keySelector, keyComparator);
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

        const items$: QueryableImpl<T> = new QueryableImpl(items);

        if (items$.isEmpty) {
            return false;
        }

        this.doInsertAll(index, items);

        return true;
    }

    public intersect(otherList: Sequence<T>): Queryable<T>;

    public intersect(otherList: Sequence<T>, comparator: EqualityComparator<T>): Queryable<T>;

    public intersect(otherList: Sequence<T>, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): Queryable<T> {
        return new QueryableImpl(this).intersect(otherList, comparator);
    }

    public join<TOuter, TKey, TResult>(
        outerList: Sequence<TOuter>,
        outerKeySelector: IteratorFunction<TOuter, TKey>,
        innerKeySelector: IteratorFunction<T, TKey>,
        resultSelector: CombineFunction<T, TOuter, TResult>
    ): Queryable<TResult>;

    public join<TOuter, TKey, TResult>(
        outerList: Sequence<TOuter>,
        outerKeySelector: IteratorFunction<TOuter, TKey>,
        innerKeySelector: IteratorFunction<T, TKey>,
        resultSelector: CombineFunction<T, TOuter, TResult>,
        keyComparator: EqualityComparator<TKey>
    ): Queryable<TResult>;

    public join<TOuter, TKey, TResult>(
        outerList: Sequence<TOuter>,
        outerKeySelector: IteratorFunction<TOuter, TKey>,
        innerKeySelector: IteratorFunction<T, TKey>,
        resultSelector: CombineFunction<T, TOuter, TResult>,
        keyComparator: EqualityComparator<TKey> = StrictEqualityComparator.get()
    ): Queryable<TResult> {
        return new QueryableImpl(this).join(outerList, outerKeySelector, innerKeySelector, resultSelector, keyComparator);
    }

    public last(predicate: IteratorFunction<T, boolean>): T | undefined;

    public last(predicate: IteratorFunction<T, boolean>, defaultValue: T): T;

    public last(predicate: IteratorFunction<T, boolean>, defaultValue?: T): T | undefined {
        if (defaultValue === undefined) {
            return new QueryableImpl(this).last(predicate);
        }

        return new QueryableImpl(this).last(predicate, defaultValue);
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

    public lastOrDefault(defaultValue: T): T {
        return new QueryableImpl(this).lastOrDefault(defaultValue);
    }

    public map<TResult>(selector: IteratorFunction<T, TResult>): Queryable<TResult> {
        return new QueryableImpl(this).map(selector);
    }

    public max(selector: IteratorFunction<T, number>): number {
        return new QueryableImpl(this).max(selector);
    }

    public min(selector: IteratorFunction<T, number>): number {
        return new QueryableImpl(this).min(selector);
    }

    public orderBy<TKey>(
        keySelector: SelectorFunction<T, TKey>,
        comparator: Comparator<TKey>
    ): Queryable<T>;

    public orderBy<TKey>(
        keySelector: SelectorFunction<T, TKey>,
        comparator: Comparator<TKey>,
        sortOrder: SortOrder
    ): Queryable<T>;

    public orderBy<TKey>(
        keySelector: SelectorFunction<T, TKey>,
        comparator: Comparator<TKey>,
        sortOrder: SortOrder = SortOrder.ASCENDING
    ): Queryable<T> {
        return new QueryableImpl(this).orderBy(keySelector, comparator, sortOrder);
    }

    public random(): T {
        return new QueryableImpl(this).random();
    }

    public abstract remove(item: T): boolean;

    public abstract remove(item: T, comparator: EqualityComparator<T>): boolean;

    public removeAll(items: Sequence<T>): boolean;

    public removeAll(items: Sequence<T>, comparator: EqualityComparator<T>): boolean;

    public removeAll(items: Sequence<T>, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): boolean {
        const items$: QueryableImpl<T> = new QueryableImpl(items);

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

    public abstract removeBy(predicate: IteratorFunction<T, boolean>): boolean;

    public retainAll(items: Sequence<T>): boolean;

    public retainAll(items: Sequence<T>, comparator: EqualityComparator<T>): boolean;

    public retainAll(items: Sequence<T>, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): boolean {
        return this.removeBy((currentItem: T) => {
            for (const otherItem of items) {
                if (comparator.equals(currentItem, otherItem)) {
                    return false;
                }
            }

            return true;
        });
    }

    public reverse(): Queryable<T> {
        return new QueryableImpl(this).reverse();
    }

    public selectMany<TInnerItem, TResult>(
        sequenceSelector: IteratorFunction<T, Sequence<TInnerItem>>,
        resultSelector: CombineFunction<T, TInnerItem, TResult>
    ): Queryable<TResult> {
        return new QueryableImpl(this).selectMany(sequenceSelector, resultSelector);
    }

    public setAt(index: number, newValue: T): T {
        CollectionUtils.validateIndexBounds(this, index);

        return this.doSetAt(index, newValue);
    }

    public skip(offset: number): Queryable<T> {
        return new QueryableImpl(this).skip(offset);
    }

    public skipWhile(predicate: IteratorFunction<T, boolean>): Queryable<T> {
        return new QueryableImpl(this).skipWhile(predicate);
    }

    public slice(offset: number): Queryable<T>;

    public slice(offset: number, length: number): Queryable<T>;

    public slice(offset: number, length: number = this.length - offset): Queryable<T> {
        return new QueryableImpl(this).slice(offset, length);
    }

    public sum(selector: IteratorFunction<T, number>): number {
        return new QueryableImpl(this).sum(selector);
    }

    public take(length: number): Queryable<T> {
        return new QueryableImpl(this).take(length);
    }

    public takeWhile(predicate: IteratorFunction<T, boolean>): Queryable<T> {
        return new QueryableImpl(this).takeWhile(predicate);
    }

    public toArray(): T[] {
        return [...this];
    }

    public toJSON(): T[] {
        return this.toArray();
    }

    public union(otherList: Sequence<T>): Queryable<T>;

    public union(otherList: Sequence<T>, comparator: EqualityComparator<T>): Queryable<T>;

    public union(otherList: Sequence<T>, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): Queryable<T> {
        return new QueryableImpl(this).union(otherList, comparator);
    }

    public zip<TOther, TResult>(
        otherList: Sequence<TOther>,
        resultSelector: CombineFunction<T, TOther, TResult>
    ): Queryable<TResult> {
        return new QueryableImpl(this).zip(otherList, resultSelector);
    }

    public entries(): Iterable<[T, number]> {
        return new QueryableImpl(this).entries();
    }

    protected abstract create<I>(items?: Sequence<I>): AbstractList<I>;

    protected abstract doAdd(item: T): void;

    protected abstract doAddAll(items: Sequence<T>): void;

    protected abstract doClear(): void;

    protected abstract doInsert(index: number, item: T): void;

    protected abstract doInsertAll(index: number, items: Sequence<T>): void;

    protected abstract doRemoveAt(index: number): T;

    protected abstract doSetAt(index: number, newValue: T): T;
}
