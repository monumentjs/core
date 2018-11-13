import {Set} from './Set';
import {Sequence} from '../../base/Sequence';
import {Grouping} from '../../base/Grouping';
import {Queryable} from '../../base/Queryable';
import {CollectionUtils} from '../../base/CollectionUtils';
import {CombineFunction} from '../../base/CombineFunction';
import {IteratorFunction} from '../../base/IteratorFunction';
import {SelectorFunction} from '../../base/SelectorFunction';
import {AggregateFunction} from '../../base/AggregateFunction';
import {NoSuchItemException} from '../../base/NoSuchItemException';
import {SortOrder} from '../../../comparison/order/SortOrder';
import {Comparator} from '../../../comparison/order/Comparator';
import {EqualityComparator} from '../../../comparison/equality/EqualityComparator';
import {StrictEqualityComparator} from '../../../comparison/equality/StrictEqualityComparator';
import {Event} from '../../../events/Event';
import {ConfigurableEvent} from '../../../events/ConfigurableEvent';
import {InvalidStateException} from '../../../exceptions/InvalidStateException';
import {InvalidOperationException} from '../../../exceptions/InvalidOperationException';
import {SetChangedEventArgs} from '../observable/SetChangedEventArgs';
import {SetChangeTransaction} from '../observable/SetChangeTransaction';
import {LinkedList} from '../../list/mutable/LinkedList';
import {List} from '../../list/mutable/List';
import {RandomInt} from '../../../random/RandomInt';


/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export abstract class AbstractSet<T> implements Set<T> {
    private readonly _comparator: EqualityComparator<T>;
    private readonly _changed: ConfigurableEvent<SetChangedEventArgs<T>> = new ConfigurableEvent();
    private _changeTransaction: SetChangeTransaction<T> | undefined;

    public get changed(): Event<SetChangedEventArgs<T>> {
        return this._changed;
    }

    public get comparator(): EqualityComparator<T> {
        return this._comparator;
    }

    public get isEmpty(): boolean {
        return this.length === 0;
    }

    public abstract get length(): number;

    protected constructor(comparator: EqualityComparator<T>) {
        this._comparator = comparator;
    }

    public abstract [Symbol.iterator](): Iterator<T>;

    public add(item: T): boolean {
        this.beginTransaction();

        this.doAdd(item);
        this.onAdd(item);

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
            this.onAdd(item);
            index++;
        }

        this.endTransaction();

        return true;
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

    public abstract clone(): Set<T>;

    public concat(otherList: Sequence<T>): Queryable<T> {
        return new LinkedList(this).concat(otherList);
    }

    public contains(otherItem: T): boolean;
    public contains(otherItem: T, comparator: EqualityComparator<T>): boolean;
    public contains(otherItem: T, comparator: EqualityComparator<T> = this.comparator): boolean {
        for (const currentItem of this) {
            if (comparator.equals(currentItem, otherItem)) {
                return true;
            }
        }

        return false;
    }

    public containsAll(items: Sequence<T>): boolean;
    public containsAll(items: Sequence<T>, comparator: EqualityComparator<T>): boolean;
    public containsAll(items: Sequence<T>, comparator: EqualityComparator<T> = this.comparator): boolean {
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
    public distinct(comparator: EqualityComparator<T> = this.comparator): Queryable<T> {
        return new LinkedList(this).distinct(comparator);
    }

    public equals(otherList: Sequence<T>): boolean;
    public equals(otherList: Sequence<T>, comparator: EqualityComparator<T>): boolean;
    public equals(otherList: Sequence<T>, comparator: EqualityComparator<T> = this.comparator): boolean {
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
    public except(otherList: Sequence<T>, comparator: EqualityComparator<T> = this.comparator): Queryable<T> {
        return new LinkedList(this).except(otherList, comparator);
    }

    public findAll(predicate: IteratorFunction<T, boolean>): Queryable<T> {
        return new LinkedList(this).findAll(predicate);
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
        const groups: List<Grouping<TKey, T>> = new LinkedList();

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

    public intersect(otherList: Sequence<T>): Queryable<T>;

    public intersect(otherList: Sequence<T>, comparator: EqualityComparator<T>): Queryable<T>;

    public intersect(otherList: Sequence<T>, comparator: EqualityComparator<T> = this.comparator): Queryable<T> {
        const intersection: List<T> = new LinkedList();

        this.forEach((actualItem: T) => {
            for (const otherItem of otherList) {
                if (comparator.equals(actualItem, otherItem)) {
                    intersection.add(actualItem);
                }
            }
        });

        return intersection;
    }

    public intersectWith(other: Sequence<T>): boolean {
        /* tslint:disable:cyclomatic-complexity */

        // intersection of anything with empty set is empty set,
        // return if count is 0
        if (this.length === 0) {
            return false;
        }

        if (other.length === 0) {
            return this.clear();
        }

        let hasChanged: boolean = false;

        for (const currentItem of this) {
            let itemPresentInBothSets: boolean = false;

            for (const otherItem of other) {
                if (this.comparator.equals(currentItem, otherItem)) {
                    itemPresentInBothSets = true;

                    break;
                }
            }

            if (!itemPresentInBothSets) {
                if (this.remove(currentItem)) {
                    hasChanged = true;
                }
            }
        }

        return hasChanged;
    }

    public isProperSubsetOf(other: Sequence<T>): boolean {
        if (this.length >= other.length) {
            return false;
        }

        return this.isSubsetOf(other);
    }

    public isProperSupersetOf(other: Sequence<T>): boolean {
        if (this.length <= other.length) {
            return false;
        }

        return this.isSupersetOf(other);
    }

    public isSubsetOf(other: Sequence<T>): boolean {
        let isValidSubset: boolean = true;

        for (const currentItem of this) {
            let isCurrentItemInOtherSet: boolean = false;

            for (const otherItem of other) {
                if (this.comparator.equals(currentItem, otherItem)) {
                    isCurrentItemInOtherSet = true;

                    break;
                }
            }

            if (!isCurrentItemInOtherSet) {
                isValidSubset = false;

                break;
            }
        }

        return isValidSubset;
    }

    public isSupersetOf(other: Sequence<T>): boolean {
        let isValidSuperset: boolean = true;

        for (const otherItem of other) {
            let isOtherItemInCurrentSet: boolean = false;

            for (const currentItem of this) {
                if (this.comparator.equals(currentItem, otherItem)) {
                    isOtherItemInCurrentSet = true;

                    break;
                }
            }

            if (!isOtherItemInCurrentSet) {
                isValidSuperset = false;

                break;
            }
        }

        return isValidSuperset;
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
        const listOfJoinedItems: List<TResult> = new LinkedList();

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
        for (let index = this.length - 1; index >= 0; index--) {
            const actualItem: T = this.getAt(index);
            const actualItemMatchesPredicate: boolean = predicate(actualItem, index);

            if (actualItemMatchesPredicate) {
                return actualItem;
            }
        }

        return defaultValue;
    }

    public lastOrDefault(defaultValue: T): T {
        if (this.isEmpty) {
            return defaultValue;
        } else {
            return this.getAt(this.length - 1);
        }
    }

    public map<TResult>(selector: IteratorFunction<T, TResult>): Queryable<TResult> {
        const result: List<TResult> = new LinkedList();

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
        return new LinkedList(this.toArray().sort((x: T, y: T): number => {
            const xKey: TKey = keySelector(x);
            const yKey: TKey = keySelector(y);

            return comparator.compare(xKey, yKey) * sortOrder;
        }));
    }

    public overlaps(other: Sequence<T>): boolean {
        for (const currentItem of this) {
            for (const otherItem of other) {
                if (this.comparator.equals(currentItem, otherItem)) {
                    return true;
                }
            }
        }

        return false;
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

    public removeAll(items: Sequence<T>, comparator: EqualityComparator<T> = this.comparator): boolean {
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

    public abstract removeBy(predicate: IteratorFunction<T, boolean>): boolean;

    public retainAll(items: Sequence<T>): boolean;

    public retainAll(items: Sequence<T>, comparator: EqualityComparator<T>): boolean;

    public retainAll(items: Sequence<T>, comparator: EqualityComparator<T> = this.comparator): boolean {
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
        const resultList: List<TResult> = new LinkedList();
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

    public setEquals(other: Sequence<T>): boolean {
        /* tslint:disable:cyclomatic-complexity */

        if (this.length !== other.length) {
            return false;
        }

        for (const otherItem of other) {
            if (!this.contains(otherItem)) {
                return false;
            }
        }

        for (const currentItem of this) {
            let currentItemInOtherCollection: boolean = false;

            for (const otherItem of other) {
                if (this.comparator.equals(currentItem, otherItem)) {
                    currentItemInOtherCollection = true;

                    break;
                }
            }

            if (!currentItemInOtherCollection) {
                return false;
            }
        }

        return true;
    }

    public skip(offset: number): Queryable<T> {
        if (offset !== 0) {
            CollectionUtils.validateIndexBounds(this, offset);
        }

        const result: List<T> = new LinkedList();
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

        const slice: List<T> = new LinkedList();
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

    public symmetricExceptWith(other: Sequence<T>): boolean {
        /* tslint:disable:cyclomatic-complexity */

        let hasChanged: boolean = false;

        for (const otherItem of other) {
            if (this.remove(otherItem)) {
                hasChanged = true;
            }
        }

        for (const currentItem of this) {
            for (const otherItem of other) {
                if (this.comparator.equals(currentItem, otherItem)) {
                    if (this.remove(currentItem)) {
                        hasChanged = true;
                    }
                }
            }
        }

        return hasChanged;
    }

    public take(length: number): Queryable<T> {
        CollectionUtils.validateSliceRange(this, 0, length);

        const result: List<T> = new LinkedList();
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

    public union(otherList: Sequence<T>, comparator: EqualityComparator<T> = this.comparator): Queryable<T> {
        const union: List<T> = new LinkedList(this);

        for (const otherItem of otherList) {
            if (!union.contains(otherItem, comparator)) {
                union.add(otherItem);
            }
        }

        return union;
    }

    public unionWith(other: Sequence<T>): boolean {
        return this.addAll(other);
    }

    public zip<TOther, TResult>(
        otherList: Sequence<TOther>,
        resultSelector: CombineFunction<T, TOther, TResult>
    ): Queryable<TResult> {
        const minLength: number = Math.min(this.length, otherList.length);
        const resultList: List<TResult> = new LinkedList();

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
            this._changeTransaction = new SetChangeTransaction(this, this._changed);
        }
    }

    protected abstract doAdd(item: T): void;

    protected abstract doAddAll(items: Sequence<T>): void;

    protected abstract doClear(): void;

    protected abstract doForEach(iterator: IteratorFunction<T, boolean | void>, startIndex: number, count: number): void;

    protected abstract doGetAt(index: number): T;

    protected endTransaction() {
        if (this._changeTransaction != null) {
            this._changeTransaction.close();
            this._changeTransaction = undefined;
        }
    }

    protected getAt(index: number): T {
        CollectionUtils.validateIndexBounds(this, index);

        return this.doGetAt(index);
    }

    protected onAdd(item: T) {
        if (this._changeTransaction) {
            this._changeTransaction.onItemAdded(item);
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

    protected onRemove(item: T) {
        if (this._changeTransaction) {
            this._changeTransaction.onItemRemoved(item);
        } else {
            throw new InvalidStateException('Change transaction is not started.');
        }
    }
}
