import {Queryable} from './Queryable';
import {AggregateFunction} from './AggregateFunction';
import {IteratorFunction} from './IteratorFunction';
import {Sequence} from './Sequence';
import {EqualityComparator} from '../../comparison/equality/EqualityComparator';
import {Grouping} from './Grouping';
import {CombineFunction} from './CombineFunction';
import {SelectorFunction} from './SelectorFunction';
import {Comparator} from '../../comparison/order/Comparator';
import {SortOrder} from '../../comparison/order/SortOrder';
import {InvalidOperationException} from '../../exceptions/InvalidOperationException';
import {StrictEqualityComparator} from '../../comparison/equality/StrictEqualityComparator';
import {List} from '@monument/core';


export class QueryableImpl<T> implements Queryable<T> {
    private readonly _source: Iterable<T>;
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

    public constructor(source: Iterable<T>) {
        this._source = source;

    }

    public [Symbol.iterator](): Iterator<T> {
        return this._source[Symbol.iterator]();
    }

    public aggregate<TAggregate>(iterator: AggregateFunction<T, TAggregate>, initialSeed: TAggregate): TAggregate {
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

    public concat(otherList: Sequence<T>): Queryable<T> {
        const self: this = this;

        return new QueryableImpl({
            *[Symbol.iterator](): Iterator<T> {
                for (const item of self) {
                    yield item;
                }

                for (const item of otherList) {
                    yield item;
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
        const self: this = this;
        const uniqueItems: T[] = [];

        return new QueryableImpl({
            *[Symbol.iterator](): Iterator<T> {
                for (const item of self) {
                    if (!new QueryableImpl(uniqueItems).contains(item, comparator)) {
                        uniqueItems.push(item);

                        yield item;
                    }
                }
            }
        });
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

    /**
     * Produces the set difference of two sequences.
     */
    public except(otherList: Sequence<T>): Queryable<T>;

    /**
     * Produces the set difference of two sequences.
     */
    public except(otherList: Sequence<T>, comparator: EqualityComparator<T>): Queryable<T>;

    /**
     * Produces the set difference of two sequences.
     */
    public except(otherList: Sequence<T>, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): Queryable<T> {
        const self: this = this;
        const commonItems: T[] = [];

        return new QueryableImpl({
            *[Symbol.iterator](): Iterator<T> {
                for (const item of self) {
                    for (const otherItem of otherList) {
                        if (self.contains(otherItem, comparator)) {
                            difference.remove(otherItem, comparator);
                        } else {
                            difference.add(otherItem);
                        }
                    }
                }
            }
        });
    }

    public findAll(predicate: IteratorFunction<T, boolean>): Queryable<T> {
        return undefined;
    }

    public first(predicate: IteratorFunction<T, boolean>): T | undefined;
    public first(predicate: IteratorFunction<T, boolean>, defaultValue: T): T;
    public first(predicate: IteratorFunction<T, boolean>, defaultValue?: T): T | undefined {
        let index: number = 0;

        for (const item of this) {
            if (predicate(item, index)) {
                return item;
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
    public forEach(iterator: IteratorFunction<T, boolean | void>, startIndex?: number, count?: number): void {
    }

    public getAt(index: number): T {
        let position = 0;

        for (const item of this) {
            if (index === position) {
                return item;
            }

            position++;
        }

        throw new InvalidOperationException(`Item at index ${index} not found.`);
    }

    public groupBy<TKey>(keySelector: IteratorFunction<T, TKey>): Queryable<Grouping<TKey, T>>;
    public groupBy<TKey>(keySelector: IteratorFunction<T, TKey>, keyComparator: EqualityComparator<TKey>): Queryable<Grouping<TKey, T>>;
    public groupBy(keySelector, keyComparator?): Queryable<Grouping<TKey, T>> {
        return undefined;
    }

    public intersect(otherList: Sequence<T>): Queryable<T>;
    public intersect(otherList: Sequence<T>, comparator: EqualityComparator<T>): Queryable<T>;
    public intersect(otherList: Sequence<T>, comparator?: EqualityComparator<T>): Queryable<T> {
        return undefined;
    }

    public join<TOuter, TKey, TResult>(outerList: Sequence<TOuter>, outerKeySelector: IteratorFunction<TOuter, TKey>, innerKeySelector: IteratorFunction<T, TKey>, resultSelector: CombineFunction<T, TOuter, TResult>): Queryable<TResult>;
    public join<TOuter, TKey, TResult>(outerList: Sequence<TOuter>, outerKeySelector: IteratorFunction<TOuter, TKey>, innerKeySelector: IteratorFunction<T, TKey>, resultSelector: CombineFunction<T, TOuter, TResult>, keyComparator: EqualityComparator<TKey>): Queryable<TResult>;
    public join(outerList, outerKeySelector, innerKeySelector, resultSelector, keyComparator?): Queryable<TResult> {
        return undefined;
    }

    public last(predicate: IteratorFunction<T, boolean>): T | undefined;

    public last(predicate: IteratorFunction<T, boolean>, defaultValue: T): T;

    public last(predicate: IteratorFunction<T, boolean>, defaultValue?: T): T | undefined {
        let lastItem: T | undefined = defaultValue;
        let index: number = 0;

        for (const item of this) {
            if (predicate(item, index)) {
                lastItem = item;
            }

            index++;
        }

        return lastItem;
    }

    public lastOrDefault(defaultValue: T): T {
        return undefined;
    }

    public map<TResult>(selector: IteratorFunction<T, TResult>): Queryable<TResult> {
        const self: this = this;

        return new QueryableImpl({
            *[Symbol.iterator](): Iterator<TResult> {
                let index: number = 0;

                for (const item of self) {
                    yield selector(item, index);

                    index++;
                }
            }
        });
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

    public orderBy<TKey>(keySelector: SelectorFunction<T, TKey>, comparator: Comparator<TKey>): Queryable<T>;
    public orderBy<TKey>(keySelector: SelectorFunction<T, TKey>, comparator: Comparator<TKey>, sortOrder: SortOrder): Queryable<T>;
    public orderBy(keySelector, comparator, sortOrder?: SortOrder): Queryable<T> {
        return undefined;
    }

    public random(): T {
        return undefined;
    }

    public reverse(): Queryable<T> {
        return undefined;
    }

    public selectMany<TInnerItem, TResult>(collectionSelector: IteratorFunction<T, Sequence<TInnerItem>>, resultSelector: CombineFunction<T, TInnerItem, TResult>): Queryable<TResult> {
        return undefined;
    }

    public skip(offset: number): Queryable<T> {
        return undefined;
    }

    public skipWhile(condition: IteratorFunction<T, boolean>): Queryable<T> {
        return undefined;
    }

    public slice(offset: number): Queryable<T>;
    public slice(offset: number, length: number): Queryable<T>;
    public slice(offset: number, length?: number): Queryable<T> {
        return undefined;
    }

    public sum(selector: IteratorFunction<T, number>): number {
        return 0;
    }

    public take(length: number): Queryable<T> {
        return undefined;
    }

    public takeWhile(condition: IteratorFunction<T, boolean>): Queryable<T> {
        return undefined;
    }

    public toArray(): T[] {
        return [];
    }

    public toJSON(): T[] {
        return undefined;
    }

    public union(otherList: Sequence<T>): Queryable<T>;
    public union(otherList: Sequence<T>, comparator: EqualityComparator<T>): Queryable<T>;
    public union(otherList: Sequence<T>, comparator?: EqualityComparator<T>): Queryable<T> {
        return undefined;
    }

    public zip<TOther, TResult>(otherList: Sequence<TOther>, resultSelector: CombineFunction<T, TOther, TResult>): Queryable<TResult> {
        return undefined;
    }
}
