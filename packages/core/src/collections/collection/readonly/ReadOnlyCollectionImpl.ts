import {
    AggregateFunction,
    CombineFunction,
    IteratorFunction,
    ReadOnlyCollection,
    SelectorFunction
} from './ReadOnlyCollection';
import {EqualityComparator} from '../../../comparison/equality/EqualityComparator';
import {Comparator} from '../../../comparison/order/Comparator';
import {SortOrder} from '../../../comparison/order/SortOrder';
import {InvalidOperationException} from '../../../exceptions/InvalidOperationException';
import {StrictEqualityComparator} from '../../../comparison/equality/StrictEqualityComparator';
import {CollectionUtils} from '../../base/CollectionUtils';
import {IndexOutOfBoundsException} from '../../../exceptions/IndexOutOfBoundsException';
import {NoSuchItemException} from '../../base/NoSuchItemException';
import {RandomInt} from '../../../random/RandomInt';
import {InvalidArgumentException} from '../../../exceptions/InvalidArgumentException';
import {Sequence} from '../../base/Sequence';
import {ReadOnlyMultiValueMap} from '../../multivaluemap/readonly/ReadOnlyMultiValueMap';
import {LinkedMultiValueMap} from '../../multivaluemap/mutable/LinkedMultiValueMap';
import {KeyValuePair} from '../../base/KeyValuePair';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @final
 * @readonly
 */
export class ReadOnlyCollectionImpl<T> implements ReadOnlyCollection<T> {
    private readonly _source: Iterable<T>;

    public constructor(source: Iterable<T>, isStatic: boolean = false) {
        this._source = isStatic ? [...source] : source;
    }

    public get length(): number {
        let length: number = 0;

        for (const _ of this) {
            length++;
        }

        return length;
    }

    public get isEmpty(): boolean {
        for (const _ of this) {
            return false;
        }

        return true;
    }

    public [Symbol.iterator](): Iterator<T> {
        return this._source[Symbol.iterator]();
    }

    public aggregate<TAggregate>(iterator: AggregateFunction<T, TAggregate>, initialSeed: TAggregate): TAggregate {
        let lastSeed: TAggregate = initialSeed;

        for (const [index, ownItem] of this.entries()) {
            lastSeed = iterator(lastSeed, ownItem, index);
        }

        return lastSeed;
    }

    public all(predicate: IteratorFunction<T, boolean>): boolean {
        if (this.isEmpty) {
            throw new InvalidOperationException(`Operation is not allowed for empty lists.`);
        }

        for (const [index, ownItem] of this.entries()) {
            if (!predicate(ownItem, index)) {
                return false;
            }
        }

        return true;
    }

    public any(predicate: IteratorFunction<T, boolean>): boolean {
        if (this.isEmpty) {
            throw new InvalidOperationException(`Operation is not allowed for empty lists.`);
        }

        for (const [index, ownItem] of this.entries()) {
            if (predicate(ownItem, index)) {
                return true;
            }
        }

        return false;
    }

    public average(selector: IteratorFunction<T, number>): number {
        if (this.isEmpty) {
            throw new InvalidOperationException(`Operation is not allowed for empty lists.`);
        }

        return this.sum(selector) / this.length;
    }

    public concat(otherList: Sequence<T>, ...others: Array<Sequence<T>>): ReadOnlyCollection<T> {
        const self: this = this;

        return new ReadOnlyCollectionImpl({
            * [Symbol.iterator](): Iterator<T> {
                for (const item of self) {
                    yield item;
                }

                for (const item of otherList) {
                    yield item;
                }

                for (const list of others) {
                    for (const item of list) {
                        yield item;
                    }
                }
            }
        });
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
        return this.aggregate((count: number, ownItem: T, index: number) => {
            const itemMatchesPredicate: boolean = predicate(ownItem, index);

            if (itemMatchesPredicate) {
                return count + 1;
            }

            return count;
        }, 0);
    }

    /**
     * Returns distinct elements from a sequence by using a specified EqualityComparator to compare values.
     */
    public distinct(): ReadOnlyCollection<T>;

    public distinct(comparator: EqualityComparator<T>): ReadOnlyCollection<T>;

    public distinct(comparator: EqualityComparator<T> = StrictEqualityComparator.get()): ReadOnlyCollection<T> {
        const self: this = this;

        return new ReadOnlyCollectionImpl({
            * [Symbol.iterator](): Iterator<T> {
                const uniqueItems: T[] = [];
                const uniqueItems$ = new ReadOnlyCollectionImpl(uniqueItems);

                for (const ownItem of self) {
                    if (!uniqueItems$.contains(ownItem, comparator)) {
                        uniqueItems.push(ownItem);

                        yield ownItem;
                    }
                }
            }
        });
    }

    public* entries(): Iterable<KeyValuePair<number, T>> {
        let index: number = 0;

        for (const ownItem of this) {
            yield [index, ownItem];

            index++;
        }
    }

    public equals(otherList: Sequence<T>): boolean;

    public equals(otherList: Sequence<T>, comparator: EqualityComparator<T>): boolean;

    public equals(otherList: Sequence<T>, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): boolean {
        const otherList$: ReadOnlyCollectionImpl<T> = new ReadOnlyCollectionImpl(otherList);

        if (this.length !== otherList$.length) {
            return false;
        }

        if (this.isEmpty && otherList$.isEmpty) {
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

    /**
     * Produces the set difference of two sequences.
     */
    public except(otherList: Sequence<T>): ReadOnlyCollection<T>;

    /**
     * Produces the set difference of two sequences.
     */
    public except(otherList: Sequence<T>, comparator: EqualityComparator<T>): ReadOnlyCollection<T>;

    /**
     * Produces the set difference of two sequences.
     */
    public except(otherList: Sequence<T>, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): ReadOnlyCollection<T> {
        const self: this = this;
        const otherList$: ReadOnlyCollectionImpl<T> = new ReadOnlyCollectionImpl(otherList);

        return new ReadOnlyCollectionImpl({
            * [Symbol.iterator](): Iterator<T> {
                for (const ownItem of self) {
                    if (!otherList$.contains(ownItem, comparator)) {
                        yield ownItem;
                    }
                }

                for (const otherItem of otherList$) {
                    if (!self.contains(otherItem, comparator)) {
                        yield otherItem;
                    }
                }
            }
        });
    }

    /**
     * Calls predicate function on each item in sequence.
     * Returns new collection containing items for which predicate function returned `true`.
     */
    public findAll(predicate: IteratorFunction<T, boolean>): ReadOnlyCollection<T>;

    /**
     * Calls predicate function on each item in sequence.
     * Returns new collection containing items for which predicate function returned `true`.
     */
    public findAll(predicate: IteratorFunction<T, boolean>, limit: number): ReadOnlyCollection<T>;

    /**
     * Calls predicate function on each item in sequence.
     * Returns new collection containing items for which predicate function returned `true`.
     */
    public findAll(predicate: IteratorFunction<T, boolean>, limit: number, offset: number): ReadOnlyCollection<T>;

    public findAll(
        predicate: IteratorFunction<T, boolean>,
        limit: number = Number.POSITIVE_INFINITY,
        offset: number = 0
    ): ReadOnlyCollection<T> {
        if (limit < 0) {
            throw new InvalidArgumentException(`Limit is negative (${limit})`);
        }

        if (offset < 0) {
            throw new InvalidArgumentException(`Offset is negative (${offset})`);
        }

        const self: this = this;

        return new ReadOnlyCollectionImpl({
            * [Symbol.iterator](): Iterator<T> {
                let matchesCount: number = 0;
                let itemsLeft: number = limit;

                for (const [index, ownItem] of self.entries()) {
                    if (predicate(ownItem, index)) {
                        if (itemsLeft > 0 && matchesCount >= offset) {
                            yield ownItem;

                            itemsLeft--;
                        }

                        matchesCount++;
                    }
                }
            }
        });
    }

    public first(predicate: IteratorFunction<T, boolean>): T | undefined;
    public first(predicate: IteratorFunction<T, boolean>, defaultValue: T): T;
    public first(predicate: IteratorFunction<T, boolean>, defaultValue?: T): T | undefined {
        for (const [index, ownItem] of this.entries()) {
            if (predicate(ownItem, index)) {
                return ownItem;
            }
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

    public forEach(iterator: IteratorFunction<T, false | void>): void;
    public forEach(iterator: IteratorFunction<T, false | void>, startIndex: number): void;
    public forEach(iterator: IteratorFunction<T, false | void>, startIndex: number, count: number): void;
    public forEach(iterator: IteratorFunction<T, false | void>, startIndex: number = 0, count: number = this.length - startIndex): void {
        CollectionUtils.validateSliceBounds(this, startIndex, count);

        let itemsLeft: number = count;

        for (const [index, ownItem] of this.entries()) {
            if (itemsLeft === 0) {
                break;
            }

            if (index >= startIndex) {
                const result: boolean | void = iterator(ownItem, index);

                if (result === false) {
                    return;
                }

                itemsLeft--;
            }
        }
    }

    public forEachBack(iterator: IteratorFunction<T, false | void>): void;
    public forEachBack(iterator: IteratorFunction<T, false | void>, startIndex: number): void;
    public forEachBack(iterator: IteratorFunction<T, false | void>, startIndex: number, count: number): void;
    public forEachBack(
        iterator: IteratorFunction<T, false | void>,
        startIndex: number = Math.max(this.length - 1, 0),
        count: number = startIndex + (this.length ? 1 : 0)
    ): void {
        if (startIndex < 0) {
            throw new InvalidArgumentException('Start index cannot be negative.');
        }

        if (count < 0) {
            throw new InvalidArgumentException('Count cannot be negative.');
        }

        let index: number = startIndex;
        let itemsLeft: number = count;

        while (itemsLeft > 0) {
            if (iterator(this.getAt(index), index) === false) {
                break;
            }

            index--;
            itemsLeft--;
        }
    }

    public getAt(index: number): T {
        if (index < 0) {
            throw new IndexOutOfBoundsException(index, this.length);
        }

        for (const [position, ownItem] of this.entries()) {
            if (index === position) {
                return ownItem;
            }
        }

        throw new IndexOutOfBoundsException(index, this.length);
    }

    public groupBy<TKey>(keySelector: IteratorFunction<T, TKey>): ReadOnlyMultiValueMap<TKey, T>;
    public groupBy<TKey>(
        keySelector: IteratorFunction<T, TKey>,
        keyComparator: EqualityComparator<TKey>
    ): ReadOnlyMultiValueMap<TKey, T>;
    public groupBy<TKey>(
        keySelector: IteratorFunction<T, TKey>,
        keyComparator: EqualityComparator<TKey> = StrictEqualityComparator.get()
    ): ReadOnlyMultiValueMap<TKey, T> {
        const groups: LinkedMultiValueMap<TKey, T> = new LinkedMultiValueMap(keyComparator);

        for (const [index, item] of this.entries()) {
            groups.put(keySelector(item, index), item);
        }

        return groups;
    }

    public intersect(otherList: Sequence<T>): ReadOnlyCollection<T>;
    public intersect(otherList: Sequence<T>, comparator: EqualityComparator<T>): ReadOnlyCollection<T>;
    public intersect(otherList: Sequence<T>, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): ReadOnlyCollection<T> {
        const self: this = this;
        const otherList$: ReadOnlyCollectionImpl<T> = new ReadOnlyCollectionImpl(otherList);

        return new ReadOnlyCollectionImpl({
            * [Symbol.iterator](): Iterator<T> {
                for (const item of self) {
                    if (otherList$.contains(item, comparator)) {
                        yield item;
                    }
                }
            }
        });
    }

    public join<TOuter, TKey, TResult>(
        outerList: Sequence<TOuter>,
        outerKeySelector: IteratorFunction<TOuter, TKey>,
        innerKeySelector: IteratorFunction<T, TKey>,
        resultSelector: CombineFunction<T, TOuter, TResult>
    ): ReadOnlyCollection<TResult>;

    public join<TOuter, TKey, TResult>(
        outerList: Sequence<TOuter>,
        outerKeySelector: IteratorFunction<TOuter, TKey>,
        innerKeySelector: IteratorFunction<T, TKey>,
        resultSelector: CombineFunction<T, TOuter, TResult>,
        keyComparator: EqualityComparator<TKey>
    ): ReadOnlyCollection<TResult>;

    public join<TOuter, TKey, TResult>(
        outerList: Sequence<TOuter>,
        outerKeySelector: IteratorFunction<TOuter, TKey>,
        innerKeySelector: IteratorFunction<T, TKey>,
        resultSelector: CombineFunction<T, TOuter, TResult>,
        keyComparator: EqualityComparator<TKey> = StrictEqualityComparator.get()
    ): ReadOnlyCollection<TResult> {
        const self = this;
        const outerList$: ReadOnlyCollectionImpl<TOuter> = new ReadOnlyCollectionImpl(outerList);

        return new ReadOnlyCollectionImpl({
            * [Symbol.iterator](): Iterator<TResult> {
                for (const [index, ownItem] of self.entries()) {
                    const innerKey: TKey = innerKeySelector(ownItem, index);

                    for (const [outerIndex, outerItem] of outerList$.entries()) {
                        const outerKey: TKey = outerKeySelector(outerItem, outerIndex);

                        if (keyComparator.equals(innerKey, outerKey)) {
                            yield resultSelector(ownItem, outerItem);
                        }
                    }
                }
            }
        });
    }

    public last(predicate: IteratorFunction<T, boolean>): T | undefined;

    public last(predicate: IteratorFunction<T, boolean>, defaultValue: T): T;

    public last(predicate: IteratorFunction<T, boolean>, defaultValue?: T): T | undefined {
        let lastItem: T | undefined = defaultValue;

        for (const [index, ownItem] of this.entries()) {
            if (predicate(ownItem, index)) {
                lastItem = ownItem;
            }
        }

        return lastItem;
    }

    public lastOrDefault(defaultValue: T): T {
        if (this.isEmpty) {
            return defaultValue;
        } else {
            return this.getAt(this.length - 1);
        }
    }

    public map<TResult>(selector: IteratorFunction<T, TResult>): ReadOnlyCollection<TResult> {
        const self: this = this;

        return new ReadOnlyCollectionImpl({
            * [Symbol.iterator](): Iterator<TResult> {
                for (const [index, ownItem] of self.entries()) {
                    yield selector(ownItem, index);
                }
            }
        });
    }

    public max(selector: IteratorFunction<T, number>): number {
        if (this.isEmpty) {
            throw new InvalidOperationException('Unable to perform operation on empty list.');
        }

        return this.aggregate((maxValue: number, ownItem: T, index: number): number => {
            const itemValue: number = selector(ownItem, index);

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

        return this.aggregate((minValue: number, ownItem: T, index: number): number => {
            const itemValue: number = selector(ownItem, index);

            if (index === 0) {
                return itemValue;
            }

            return Math.min(minValue, itemValue);
        }, 0);
    }

    public orderBy<TKey>(keySelector: SelectorFunction<T, TKey>, comparator: Comparator<TKey>): ReadOnlyCollection<T>;
    public orderBy<TKey>(keySelector: SelectorFunction<T, TKey>, comparator: Comparator<TKey>, sortOrder: SortOrder): ReadOnlyCollection<T>;
    public orderBy<TKey>(
        keySelector: SelectorFunction<T, TKey>,
        comparator: Comparator<TKey>,
        sortOrder: SortOrder = SortOrder.ASCENDING
    ): ReadOnlyCollection<T> {
        return new ReadOnlyCollectionImpl(this.toArray().sort((x: T, y: T): number => {
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

    public reverse(): ReadOnlyCollection<T> {
        return new ReadOnlyCollectionImpl(this.toArray().reverse());
    }

    public selectMany<TInnerItem, TResult>(
        collectionSelector: IteratorFunction<T, Sequence<TInnerItem>>,
        resultSelector: CombineFunction<T, TInnerItem, TResult>
    ): ReadOnlyCollection<TResult> {
        const self: this = this;

        return new ReadOnlyCollectionImpl({
            * [Symbol.iterator](): Iterator<TResult> {
                const collections: ReadOnlyCollection<Sequence<TInnerItem>> = self.map<Sequence<TInnerItem>>((
                    ownItem: T,
                    actualItemIndex: number
                ): Sequence<TInnerItem> => {
                    return collectionSelector(ownItem, actualItemIndex);
                });

                let index: number = 0;

                // TODO: use two iterators
                for (const collection of collections) {
                    const ownItem: T = self.getAt(index);

                    for (const innerItem of collection) {
                        yield resultSelector(ownItem, innerItem);
                    }

                    index += 1;
                }
            }
        });
    }

    public skip(offset: number): ReadOnlyCollection<T> {
        const self: this = this;

        if (offset < 0) {
            throw new IndexOutOfBoundsException('Offset cannot be negative.');
        }

        return new ReadOnlyCollectionImpl({
            * [Symbol.iterator](): Iterator<T> {
                let index: number = 0;

                for (const item of self) {
                    if (index >= offset) {
                        yield item;
                    }

                    index++;
                }
            }
        });
    }

    public skipWhile(condition: IteratorFunction<T, boolean>): ReadOnlyCollection<T> {
        const self: this = this;

        return new ReadOnlyCollectionImpl({
            * [Symbol.iterator](): Iterator<T> {
                let skip: boolean = true;

                for (const [index, item] of self.entries()) {
                    if (skip) {
                        skip = condition(item, index);
                    }

                    if (!skip) {
                        yield item;
                    }
                }
            }
        });
    }

    public slice(offset: number): ReadOnlyCollection<T>;
    public slice(offset: number, length: number): ReadOnlyCollection<T>;
    public slice(offset: number, length: number = this.length - offset): ReadOnlyCollection<T> {
        CollectionUtils.validateSliceBounds(this, offset, length);

        const self: this = this;
        const maxIndex: number = offset + length;

        return new ReadOnlyCollectionImpl({
            * [Symbol.iterator](): Iterator<T> {
                for (const [index, item] of self.entries()) {
                    if (index >= maxIndex) {
                        break;
                    }

                    if (index >= offset) {
                        yield item;
                    }
                }
            }
        });
    }

    public sum(selector: IteratorFunction<T, number>): number {
        if (this.isEmpty) {
            throw new InvalidOperationException(`Operation is not allowed for empty lists.`);
        }

        return this.aggregate((total: number, ownItem: T, index: number): number => {
            const selectedValue: number = selector(ownItem, index);

            return total + selectedValue;
        }, 0);
    }

    public take(length: number): ReadOnlyCollection<T> {
        if (length < 0) {
            throw new InvalidArgumentException('Slice length cannot be negative.');
        }

        const self: this = this;

        return new ReadOnlyCollectionImpl({
            * [Symbol.iterator](): Iterator<T> {
                for (const [index, item] of self.entries()) {
                    if (index >= length) {
                        break;
                    }

                    yield item;
                }
            }
        });
    }

    public takeWhile(condition: IteratorFunction<T, boolean>): ReadOnlyCollection<T> {
        const self: this = this;

        return new ReadOnlyCollectionImpl({
            * [Symbol.iterator](): Iterator<T> {
                for (const [index, item] of self.entries()) {
                    if (!condition(item, index)) {
                        break;
                    }

                    yield item;
                }
            }
        });
    }

    public toArray(): T[] {
        return [...this];
    }

    public toJSON(): T[] {
        return this.toArray();
    }

    public union(otherList: Sequence<T>): ReadOnlyCollection<T>;
    public union(otherList: Sequence<T>, comparator: EqualityComparator<T>): ReadOnlyCollection<T>;
    public union(otherList: Sequence<T>, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): ReadOnlyCollection<T> {
        const self = this;

        return new ReadOnlyCollectionImpl({
            * [Symbol.iterator](): Iterator<T> {
                const union: T[] = self.toArray();
                const union$: ReadOnlyCollectionImpl<T> = new ReadOnlyCollectionImpl(union);

                for (const item of self) {
                    yield item;
                }

                for (const item of otherList) {
                    if (!union$.contains(item, comparator)) {
                        union.push(item);
                        yield item;
                    }
                }
            }
        });
    }

    public zip<TOther, TResult>(
        otherItems: Sequence<TOther>,
        resultSelector: CombineFunction<T, TOther, TResult>
    ): ReadOnlyCollection<TResult> {
        const self: this = this;

        return new ReadOnlyCollectionImpl({
            * [Symbol.iterator](): Iterator<TResult> {
                const otherItems$ = new ReadOnlyCollectionImpl(otherItems);
                const minLength: number = Math.min(self.length, otherItems$.length);

                for (const [index, otherItem] of otherItems$.entries()) {
                    if (index >= minLength) {
                        break;
                    }

                    const ownItem: T = self.getAt(index);
                    const result: TResult = resultSelector(ownItem, otherItem);

                    yield result;
                }
            }
        });
    }
}
