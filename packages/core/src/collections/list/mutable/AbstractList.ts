import {RandomInt} from '../../../random/RandomInt';
import {List} from './List';
import {Sequence} from '../../base/Sequence';
import {IteratorFunction} from '../../base/IteratorFunction';
import {CollectionUtils} from '../../base/CollectionUtils';
import {AggregateFunction} from '../../base/AggregateFunction';
import {Queryable} from '../../base/Queryable';
import {Grouping} from '../../base/Grouping';
import {CombineFunction} from '../../base/CombineFunction';
import {SelectorFunction} from '../../base/SelectorFunction';
import {NoSuchItemException} from '../../base/NoSuchItemException';
import {EqualityComparator} from '../../../comparison/equality/EqualityComparator';
import {StrictEqualityComparator} from '../../../comparison/equality/StrictEqualityComparator';
import {InvalidOperationException} from '../../../exceptions/InvalidOperationException';
import {IndexOutOfBoundsException} from '../../../exceptions/IndexOutOfBoundsException';
import {RangeException} from '../../../exceptions/RangeException';
import {SortOrder} from '../../../comparison/order/SortOrder';
import {Comparator} from '../../../comparison/order/Comparator';
import {ListChangedEventArgs} from '../observable/ListChangedEventArgs';
import {Event} from '../../../events/Event';
import {ConfigurableEvent} from '../../../events/ConfigurableEvent';
import {ListChangeTransaction} from '../observable/ListChangeTransaction';
import {InvalidStateException} from '../../../exceptions/InvalidStateException';


/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export abstract class AbstractList<T> implements List<T> {
    private readonly _changed: ConfigurableEvent<ListChangedEventArgs<T>> = new ConfigurableEvent();
    private _changeTransaction: ListChangeTransaction<T> | undefined;

    public get changed(): Event<ListChangedEventArgs<T>> {
        return this._changed;
    }

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
        this.beginTransaction();

        const index = this.length;

        this.doAdd(item);
        this.onAdd(index, item);

        this.endTransaction();

        return true;
    }

    public addAll(items: Sequence<T>): boolean {
        if (items.length === 0) {
            return false;
        }

        this.beginTransaction();

        let index: number = this.length;

        this.doAddAll(items);

        for (const item of items) {
            this.onAdd(index, item);
            index++;
        }

        this.endTransaction();

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
        let lastSeed: TAggregate = initialSeed;

        this.forEach((actualItem, index) => {
            lastSeed = iterator(lastSeed, actualItem, index);
        });

        return lastSeed;
    }

    public all(predicate: IteratorFunction<T, boolean>): boolean {
        if (this.isEmpty) {
            throw new InvalidOperationException(`Operation is not allowed for empty lists.`);
        }

        let index: number = 0;

        for (const item of this) {
            if (!predicate(item, index)) {
                return false;
            }

            index++;
        }

        return true;
    }

    public any(predicate: IteratorFunction<T, boolean>): boolean {
        if (this.isEmpty) {
            throw new InvalidOperationException(`Operation is not allowed for empty lists.`);
        }

        let index: number = 0;

        for (const item of this) {
            if (predicate(item, index)) {
                return true;
            }

            index++;
        }

        return false;
    }

    public average(selector: IteratorFunction<T, number>): number {
        if (this.isEmpty) {
            throw new InvalidOperationException(`Operation is not allowed for empty lists.`);
        }

        return this.sum(selector) / this.length;
    }

    public clear(): boolean {
        if (this.isEmpty) {
            return false;
        }

        const itemsCount: number = this.length;

        this.beginTransaction();
        this.doClear();
        this.onClear(itemsCount);
        this.endTransaction();

        return true;
    }

    public abstract clone(): List<T>;

    public concat(otherList: Sequence<T>): Queryable<T> {
        const result: List<T> = this.create();

        result.addAll(this);
        result.addAll(otherList);

        return result;
    }

    public contains(otherItem: T): boolean;

    public contains(otherItem: T, comparator: EqualityComparator<T>): boolean;

    public contains(otherItem: T, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): boolean {
        for (const currentItem of this) {
            if (comparator.equals(currentItem, otherItem)) {
                return true;
            }
        }

        return false;
    }

    public containsAll(items: Sequence<T>): boolean;

    public containsAll(items: Sequence<T>, comparator: EqualityComparator<T>): boolean;

    public containsAll(items: Sequence<T>, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): boolean {
        if (items.length === 0) {
            return false;
        }

        for (const item of items) {
            if (!this.contains(item, comparator)) {
                return false;
            }
        }

        return true;
    }

    public count(predicate: IteratorFunction<T, boolean>): number {
        return this.aggregate((count: number, item: T, index: number) => {
            const itemMatchesPredicate: boolean = predicate(item, index);

            if (itemMatchesPredicate) {
                return count + 1;
            }

            return count;
        }, 0);
    }

    /**
     * Returns distinct elements from a sequence by using a specified EqualityComparator to compare values.
     */
    public distinct(): Queryable<T>;

    public distinct(comparator: EqualityComparator<T>): Queryable<T>;

    public distinct(comparator: EqualityComparator<T> = StrictEqualityComparator.get()): Queryable<T> {
        const distinctItems: List<T> = this.create();

        this.forEach((actualItem: T): void => {
            if (!distinctItems.contains(actualItem, comparator)) {
                distinctItems.add(actualItem);
            }
        });

        return distinctItems;
    }

    public equals(otherList: Sequence<T>): boolean;

    public equals(otherList: Sequence<T>, comparator: EqualityComparator<T>): boolean;

    public equals(otherList: Sequence<T>, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): boolean {
        /*tslint:disable:cyclomatic-complexity*/
        if (this.length !== otherList.length) {
            return false;
        }

        if (this.isEmpty && otherList.length === 0) {
            return true;
        }

        const thisIterator: Iterator<T> = this[Symbol.iterator]();
        const otherIterator: Iterator<T> = otherList[Symbol.iterator]();

        let thisIteratorResult: IteratorResult<T> = thisIterator.next();
        let otherIteratorResult: IteratorResult<T> = otherIterator.next();

        while (thisIteratorResult.done === false && otherIteratorResult.done === false) {
            if (!comparator.equals(thisIteratorResult.value, otherIteratorResult.value)) {
                return false;
            }

            thisIteratorResult = thisIterator.next();
            otherIteratorResult = otherIterator.next();
        }

        return true;
    }

    public except(otherList: Sequence<T>): Queryable<T>;

    public except(otherList: Sequence<T>, comparator: EqualityComparator<T>): Queryable<T>;

    public except(otherList: Sequence<T>, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): Queryable<T> {
        const difference: List<T> = this.create(this);

        for (const otherItem of otherList) {
            if (this.contains(otherItem, comparator)) {
                difference.remove(otherItem, comparator);
            } else {
                difference.add(otherItem);
            }
        }

        return difference;
    }

    public findAll(predicate: IteratorFunction<T, boolean>): Queryable<T> {
        const result: List<T> = this.create();

        this.forEach((actualItem, index) => {
            const itemMatchesPredicate: boolean = predicate(actualItem, index);

            if (itemMatchesPredicate) {
                result.add(actualItem);
            }
        });

        return result;
    }

    public first(predicate: IteratorFunction<T, boolean>): T | undefined;

    public first(predicate: IteratorFunction<T, boolean>, defaultValue: T): T;

    public first(predicate: IteratorFunction<T, boolean>, defaultValue?: T): T | undefined {
        let index: number = 0;

        for (const actualItem of this) {
            const actualItemMatchesPredicate: boolean = predicate(actualItem, index);

            if (actualItemMatchesPredicate) {
                return actualItem;
            }

            index++;
        }

        return defaultValue;
    }

    public firstOrDefault(defaultValue: T): T {
        if (this.isEmpty) {
            return defaultValue;
        } else {
            return this.getAt(0);
        }
    }

    public forEach(iterator: IteratorFunction<T, boolean | void>): void;

    public forEach(iterator: IteratorFunction<T, boolean | void>, startIndex: number): void;

    public forEach(iterator: IteratorFunction<T, boolean | void>, startIndex: number, count: number): void;

    public forEach(iterator: IteratorFunction<T, boolean | void>, startIndex: number = 0, count: number = this.length - startIndex): void {
        CollectionUtils.validateSliceBounds(this, startIndex, count);

        if (count > 0) {
            this.doForEach(iterator, startIndex, count);
        }
    }

    public getAt(index: number): T {
        CollectionUtils.validateIndexBounds(this, index);

        return this.doGetAt(index);
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
        const allKeys: Queryable<TKey> = this.map((item: T, index: number) => {
            return keySelector(item, index);
        });
        const keys: Queryable<TKey> = allKeys.distinct(keyComparator);
        const groups: List<Grouping<TKey, T>> = this.create();

        for (const key of keys) {
            const items: Queryable<T> = this.findAll((item: T, index: number): boolean => {
                const otherKey: TKey = keySelector(item, index);

                return keyComparator.equals(key, otherKey);
            });
            const group: Grouping<TKey, T> = new Grouping(key, items);

            groups.add(group);
        }

        return groups;
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

        for (let index: number = startIndex; index < startIndex + count; index++) {
            // TODO: optimize item access
            const currentItem: T = this.getAt(index);

            if (comparator.equals(currentItem, item)) {
                return index;
            }
        }

        return -1;
    }

    public insert(index: number, item: T): boolean {
        CollectionUtils.validateIndex(index);

        if (index > this.length) {
            throw new IndexOutOfBoundsException(`Index=${index}, length=${this.length}`);
        }

        this.beginTransaction();
        this.doInsert(index, item);
        this.onInsert(index, item);
        this.endTransaction();

        return true;
    }

    public insertAll(index: number, items: Sequence<T>): boolean {
        CollectionUtils.validateIndex(index);

        if (index > this.length) {
            throw new IndexOutOfBoundsException(`Index=${index}, length=${this.length}`);
        }

        if (items.length === 0) {
            return false;
        }

        this.beginTransaction();
        this.doInsertAll(index, items);

        let offset = 0;

        for (const item of items) {
            this.onInsert(index + offset, item);

            offset++;
        }

        this.endTransaction();

        return true;
    }

    public intersect(otherList: Sequence<T>): Queryable<T>;

    public intersect(otherList: Sequence<T>, comparator: EqualityComparator<T>): Queryable<T>;

    public intersect(otherList: Sequence<T>, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): Queryable<T> {
        const intersection: List<T> = this.create();

        this.forEach((actualItem: T) => {
            for (const otherItem of otherList) {
                if (comparator.equals(actualItem, otherItem)) {
                    intersection.add(actualItem);
                }
            }
        });

        return intersection;
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
        const listOfJoinedItems: List<TResult> = this.create();

        this.forEach((innerItem: T, innerIndex: number): void => {
            const innerKey: TKey = innerKeySelector(innerItem, innerIndex);
            let outerIndex: number = 0;

            for (const outerItem of outerList) {
                const outerKey: TKey = outerKeySelector(outerItem, outerIndex);

                if (keyComparator.equals(innerKey, outerKey)) {
                    listOfJoinedItems.add(resultSelector(innerItem, outerItem));
                }

                outerIndex += 1;
            }
        });

        return listOfJoinedItems;
    }

    public last(predicate: IteratorFunction<T, boolean>): T | undefined;

    public last(predicate: IteratorFunction<T, boolean>, defaultValue: T): T;

    public last(predicate: IteratorFunction<T, boolean>, defaultValue?: T): T | undefined {
        for (let index = this.lastIndex; index >= 0; index--) {
            const actualItem: T = this.getAt(index);
            const actualItemMatchesPredicate: boolean = predicate(actualItem, index);

            if (actualItemMatchesPredicate) {
                return actualItem;
            }
        }

        return defaultValue;
    }

    public lastIndexOf(item: T): number;

    public lastIndexOf(item: T, comparator: EqualityComparator<T>): number;

    public lastIndexOf(item: T, comparator: EqualityComparator<T>, startIndex: number): number;

    public lastIndexOf(item: T, comparator: EqualityComparator<T>, startIndex: number, count: number): number;

    public lastIndexOf(
        item: T,
        comparator: EqualityComparator<T> = StrictEqualityComparator.get(),
        startIndex: number = Math.max(0, this.lastIndex),
        count: number = startIndex + 1
    ): number {
        if (startIndex !== 0) {
            CollectionUtils.validateIndexBounds(this, startIndex);
        }

        if (this.isEmpty) {
            return -1;
        }

        if (count < 0 || count > this.length) {
            throw new RangeException(`Scan range length is not valid. Value=${count}`);
        }

        let itemsLeft: number = count;

        for (let index = startIndex; itemsLeft > 0; index--, itemsLeft--) {
            // TODO: optimize item access
            const currentItem: T = this.getAt(index);

            if (comparator.equals(currentItem, item)) {
                return index;
            }
        }

        return -1;
    }

    public lastOrDefault(defaultValue: T): T {
        if (this.isEmpty) {
            return defaultValue;
        } else {
            return this.getAt(this.lastIndex);
        }
    }

    public map<TResult>(selector: IteratorFunction<T, TResult>): Queryable<TResult> {
        const result: List<TResult> = this.create();

        this.forEach((actualItem, index) => {
            result.add(selector(actualItem, index));
        });

        return result;
    }

    public max(selector: IteratorFunction<T, number>): number {
        if (this.isEmpty) {
            throw new InvalidOperationException('Unable to perform operation on empty list.');
        }

        return this.aggregate((maxValue: number, actualItem: T, index: number): number => {
            const itemValue: number = selector(actualItem, index);

            if (index === 0) {
                return itemValue;
            }

            return Math.max(maxValue, itemValue);
        }, 0);
    }

    public min(selector: IteratorFunction<T, number>): number {
        if (this.isEmpty) {
            throw new InvalidOperationException('Unable to perform operation on empty list.');
        }

        return this.aggregate((minValue: number, actualItem: T, index: number): number => {
            const itemValue: number = selector(actualItem, index);

            if (index === 0) {
                return itemValue;
            }

            return Math.min(minValue, itemValue);
        }, 0);
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
        return this.create(this.toArray().sort((x: T, y: T): number => {
            const xKey: TKey = keySelector(x);
            const yKey: TKey = keySelector(y);

            return comparator.compare(xKey, yKey) * sortOrder;
        }));
    }

    public random(): T {
        if (this.isEmpty) {
            throw new NoSuchItemException('Random item not found.');
        }

        const index: number = new RandomInt(0, this.length).value;

        return this.getAt(index);
    }

    public abstract remove(item: T): boolean;

    public abstract remove(item: T, comparator: EqualityComparator<T>): boolean;

    public removeAll(items: Sequence<T>): boolean;

    public removeAll(items: Sequence<T>, comparator: EqualityComparator<T>): boolean;

    public removeAll(items: Sequence<T>, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): boolean {
        if (items.length === 0) {
            return false;
        }

        return this.removeBy((actualItem) => {
            for (const item of items) {
                if (comparator.equals(item, actualItem)) {
                    return true;
                }
            }

            return false;
        });
    }

    public removeAt(index: number): T {
        CollectionUtils.validateIndexBounds(this, index);

        this.beginTransaction();

        const removedItem: T = this.doRemoveAt(index);

        this.onRemove(index, removedItem);
        this.endTransaction();

        return removedItem;
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

    public abstract reverse(): Queryable<T>;

    public selectMany<TInnerItem, TResult>(
        sequenceSelector: IteratorFunction<T, Sequence<TInnerItem>>,
        resultSelector: CombineFunction<T, TInnerItem, TResult>
    ): Queryable<TResult> {
        const resultList: List<TResult> = this.create();
        const collections: Queryable<Sequence<TInnerItem>> = this.map<Sequence<TInnerItem>>((
            actualItem: T,
            actualItemIndex: number
        ): Sequence<TInnerItem> => {
            return sequenceSelector(actualItem, actualItemIndex);
        });

        let index: number = 0;

        // TODO: use two iterators
        for (const collection of collections) {
            const actualItem: T = this.getAt(index);

            for (const innerItem of collection) {
                resultList.add(resultSelector(actualItem, innerItem));
            }

            index += 1;
        }

        return resultList;
    }

    public setAt(index: number, newValue: T): T {
        CollectionUtils.validateIndexBounds(this, index);

        this.beginTransaction();

        const oldValue: T = this.doSetAt(index, newValue);

        this.onReplace(index, oldValue, newValue);
        this.endTransaction();

        return oldValue;
    }

    public skip(offset: number): Queryable<T> {
        if (offset !== 0) {
            CollectionUtils.validateIndexBounds(this, offset);
        }

        const result: List<T> = this.create();
        let index: number = 0;

        for (const item of this) {
            if (index >= offset) {
                result.add(item);
            }

            index++;
        }

        return result;
    }

    public skipWhile(predicate: IteratorFunction<T, boolean>): Queryable<T> {
        let offset: number = 0;

        this.forEach((actualItem: T, index: number): boolean | void => {
            const actualItemMatchesPredicate: boolean = predicate(actualItem, index);

            if (actualItemMatchesPredicate) {
                offset += 1;
            } else {
                return false;
            }
        });

        return this.skip(offset);
    }

    public slice(offset: number): Queryable<T>;

    public slice(offset: number, length: number): Queryable<T>;

    public slice(offset: number, length: number = this.length - offset): Queryable<T> {
        CollectionUtils.validateSliceBounds(this, offset, length);

        const slice: List<T> = this.create();
        const maxIndex: number = offset + length;
        let index: number = 0;

        for (const item of this) {
            if (index >= maxIndex) {
                break;
            }

            if (index >= offset) {
                slice.add(item);
            }

            index++;
        }

        return slice;
    }

    public sum(selector: IteratorFunction<T, number>): number {
        if (this.isEmpty) {
            throw new InvalidOperationException(`Operation is not allowed for empty lists.`);
        }

        return this.aggregate((total: number, actualItem: T, index: number): number => {
            const selectedValue: number = selector(actualItem, index);

            return total + selectedValue;
        }, 0);
    }

    public take(length: number): Queryable<T> {
        CollectionUtils.validateSliceRange(this, 0, length);

        const result: List<T> = this.create();
        let index: number = 0;

        for (const item of this) {
            if (index >= length) {
                break;
            }

            result.add(item);

            index++;
        }

        return result;
    }

    public takeWhile(predicate: IteratorFunction<T, boolean>): Queryable<T> {
        let length: number = 0;

        this.forEach((actualItem: T, index: number): boolean | void => {
            const actualItemMatchesPredicate: boolean = predicate(actualItem, index);

            if (actualItemMatchesPredicate) {
                length += 1;
            } else {
                return false;
            }
        });

        return this.take(length);
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
        const union: List<T> = this.create(this);

        for (const otherItem of otherList) {
            if (!union.contains(otherItem, comparator)) {
                union.add(otherItem);
            }
        }

        return union;
    }

    public zip<TOther, TResult>(
        otherList: Sequence<TOther>,
        resultSelector: CombineFunction<T, TOther, TResult>
    ): Queryable<TResult> {
        const minLength: number = Math.min(this.length, otherList.length);
        const resultList: List<TResult> = this.create();

        if (minLength === 0) {
            return resultList;
        }

        let index: number = 0;

        for (const otherItem of otherList) {
            const actualItem: T = this.getAt(index);
            const result: TResult = resultSelector(actualItem, otherItem);

            resultList.add(result);

            index++;

            if (index >= minLength) {
                break;
            }
        }

        return resultList;
    }

    protected beginTransaction() {
        if (this._changeTransaction == null) {
            this._changeTransaction = new ListChangeTransaction(this, this._changed);
        }
    }

    protected abstract create<I>(items?: Sequence<I>): AbstractList<I>;

    protected abstract doAdd(item: T): void;

    protected abstract doAddAll(items: Sequence<T>): void;

    protected abstract doClear(): void;

    protected abstract doForEach(iterator: IteratorFunction<T, boolean | void>, startIndex: number, count: number): void;

    protected abstract doGetAt(index: number): T;

    protected abstract doInsert(index: number, item: T): void;

    protected abstract doInsertAll(index: number, items: Sequence<T>): void;

    protected abstract doRemoveAt(index: number): T;

    protected abstract doSetAt(index: number, newValue: T): T;

    protected endTransaction() {
        if (this._changeTransaction != null) {
            this._changeTransaction.close();
            this._changeTransaction = undefined;
        }
    }

    protected onAdd(index: number, item: T) {
        if (this._changeTransaction) {
            this._changeTransaction.onItemAdded(index, item);
        } else {
            throw new InvalidStateException('Change transaction is not started.');
        }
    }

    protected onClear(itemsRemoved: number) {
        if (this._changeTransaction) {
            this._changeTransaction.onListCleared(itemsRemoved);
        } else {
            throw new InvalidStateException('Change transaction is not started.');
        }
    }

    protected onInsert(index: number, item: T) {
        if (this._changeTransaction) {
            this._changeTransaction.onItemInserted(index, item);
        } else {
            throw new InvalidStateException('Change transaction is not started.');
        }
    }

    protected onRemove(index: number, item: T) {
        if (this._changeTransaction) {
            this._changeTransaction.onItemRemoved(index, item);
        } else {
            throw new InvalidStateException('Change transaction is not started.');
        }
    }

    protected onReplace(index: number, oldValue: T, newValue: T) {
        if (this._changeTransaction) {
            this._changeTransaction.onItemReplaced(index, oldValue, newValue);
        } else {
            throw new InvalidStateException('Change transaction is not started.');
        }
    }

}
