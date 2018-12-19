import {SequenceProxy} from '../../../base/proxy/SequenceProxy';
import {ReadOnlyCollection} from '../ReadOnlyCollection';
import {Sequence} from '../../../base/Sequence';
import {Grouping} from '../../../base/Grouping';
import {CombineFunction} from '../../../base/CombineFunction';
import {IteratorFunction} from '../../../base/IteratorFunction';
import {SelectorFunction} from '../../../base/SelectorFunction';
import {AggregateFunction} from '../../../base/AggregateFunction';
import {SortOrder} from '../../../../comparison/order/SortOrder';
import {Comparator} from '../../../../comparison/order/Comparator';
import {EqualityComparator} from '../../../../comparison/equality/EqualityComparator';
import {StrictEqualityComparator} from '../../../../comparison/equality/StrictEqualityComparator';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class ReadOnlyCollectionProxy<T, TItems extends ReadOnlyCollection<T>>
    extends SequenceProxy<T, TItems>
    implements ReadOnlyCollection<T> {

    public get isEmpty(): boolean {
        return this.length === 0;
    }

    public aggregate<TAggregate>(iterator: AggregateFunction<T, TAggregate>, initialSeed: TAggregate): TAggregate {
        return this._items.aggregate(iterator, initialSeed);
    }

    public all(predicate: IteratorFunction<T, boolean>): boolean {
        return this._items.all(predicate);
    }

    public any(predicate: IteratorFunction<T, boolean>): boolean {
        return this._items.any(predicate);
    }

    public average(selector: IteratorFunction<T, number>): number {
        return this._items.average(selector);
    }

    public concat(otherList: Sequence<T>, ...others: Array<Sequence<T>>): ReadOnlyCollection<T> {
        return this._items.concat(otherList, ...others);
    }

    public contains(item: T): boolean;

    public contains(item: T, comparator: EqualityComparator<T>): boolean;

    public contains(item: T, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): boolean {
        return this._items.contains(item, comparator);
    }

    public containsAll(items: Sequence<T>): boolean;

    public containsAll(items: Sequence<T>, comparator: EqualityComparator<T>): boolean;

    public containsAll(items: Sequence<T>, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): boolean {
        return this._items.containsAll(items, comparator);
    }

    public count(predicate: IteratorFunction<T, boolean>): number {
        return this._items.count(predicate);
    }

    public distinct(): ReadOnlyCollection<T>;

    public distinct(comparator: EqualityComparator<T>): ReadOnlyCollection<T>;

    public distinct(comparator: EqualityComparator<T> = StrictEqualityComparator.get()): ReadOnlyCollection<T> {
        return this._items.distinct(comparator);
    }

    public entries(): Iterable<[T, number]> {
        return this._items.entries();
    }

    public except(otherList: Sequence<T>): ReadOnlyCollection<T>;

    public except(otherList: Sequence<T>, comparator: EqualityComparator<T>): ReadOnlyCollection<T>;

    public except(otherList: Sequence<T>, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): ReadOnlyCollection<T> {
        return this._items.except(otherList, comparator);
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
        return this._items.findAll(predicate, limit, offset);
    }

    public first(predicate: IteratorFunction<T, boolean>): T | undefined;

    public first(predicate: IteratorFunction<T, boolean>, defaultValue: T): T;

    public first(predicate: IteratorFunction<T, boolean>, defaultValue?: T): T | undefined {
        // @ts-ignore
        return this._items.first(predicate, defaultValue);
    }

    public firstOrDefault(defaultValue: T): T {
        return this._items.firstOrDefault(defaultValue);
    }

    public forEach(iterator: IteratorFunction<T, false | void>): void;
    public forEach(iterator: IteratorFunction<T, false | void>, startIndex: number): void;
    public forEach(iterator: IteratorFunction<T, false | void>, startIndex: number, count: number): void;
    public forEach(
        iterator: IteratorFunction<T, false | void>,
        startIndex: number = 0,
        count: number = this.length - startIndex
    ): void {
        this._items.forEach(iterator, startIndex, count);
    }

    public forEachBack(iterator: IteratorFunction<T, false | void>): void;
    public forEachBack(iterator: IteratorFunction<T, false | void>, startIndex: number): void;
    public forEachBack(iterator: IteratorFunction<T, false | void>, startIndex: number, count: number): void;
    public forEachBack(
        iterator: IteratorFunction<T, false | void>,
        startIndex: number = Math.max(this.length - 1, 0),
        count: number = startIndex + (this.length ? 1 : 0)
    ): void {
        this._items.forEachBack(iterator, startIndex, count);
    }

    public groupBy<TKey>(
        keySelector: IteratorFunction<T, TKey>
    ): ReadOnlyCollection<Grouping<TKey, T>>;

    public groupBy<TKey>(
        keySelector: IteratorFunction<T, TKey>,
        keyComparator: EqualityComparator<TKey>
    ): ReadOnlyCollection<Grouping<TKey, T>>;

    public groupBy<TKey>(
        keySelector: IteratorFunction<T, TKey>,
        keyComparator: EqualityComparator<TKey> = StrictEqualityComparator.get()
    ): ReadOnlyCollection<Grouping<TKey, T>> {
        return this._items.groupBy(keySelector, keyComparator);
    }

    public intersect(otherList: Sequence<T>): ReadOnlyCollection<T>;

    public intersect(otherList: Sequence<T>, comparator: EqualityComparator<T>): ReadOnlyCollection<T>;

    public intersect(otherList: Sequence<T>, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): ReadOnlyCollection<T> {
        return this._items.intersect(otherList, comparator);
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
        return this._items.join(outerList, outerKeySelector, innerKeySelector, resultSelector, keyComparator);
    }

    public last(predicate: IteratorFunction<T, boolean>): T | undefined;

    public last(predicate: IteratorFunction<T, boolean>, defaultValue: T): T;

    public last(predicate: IteratorFunction<T, boolean>, defaultValue?: T): T | undefined {
        // @ts-ignore
        return this._items.last(predicate, defaultValue);
    }

    public lastOrDefault(defaultValue: T): T {
        return this._items.lastOrDefault(defaultValue);
    }

    public map<TResult>(selector: IteratorFunction<T, TResult>): ReadOnlyCollection<TResult> {
        return this._items.map(selector);
    }

    public max(selector: IteratorFunction<T, number>): number {
        return this._items.max(selector);
    }

    public min(selector: IteratorFunction<T, number>): number {
        return this._items.min(selector);
    }

    public orderBy<TKey>(
        keySelector: SelectorFunction<T, TKey>,
        comparator: Comparator<TKey>
    ): ReadOnlyCollection<T>;

    public orderBy<TKey>(
        keySelector: SelectorFunction<T, TKey>,
        comparator: Comparator<TKey>,
        sortOrder: SortOrder
    ): ReadOnlyCollection<T>;

    public orderBy<TKey>(
        keySelector: SelectorFunction<T, TKey>,
        comparator: Comparator<TKey>,
        sortOrder: SortOrder = SortOrder.ASCENDING
    ): ReadOnlyCollection<T> {
        return this._items.orderBy(keySelector, comparator, sortOrder);
    }

    public random(): T {
        return this._items.random();
    }

    public reverse(): ReadOnlyCollection<T> {
        return this._items.reverse();
    }

    public selectMany<TInnerItem, TResult>(
        collectionSelector: IteratorFunction<T, Sequence<TInnerItem>>,
        resultSelector: CombineFunction<T, TInnerItem, TResult>
    ): ReadOnlyCollection<TResult> {
        return this._items.selectMany(collectionSelector, resultSelector);
    }

    public skip(offset: number): ReadOnlyCollection<T> {
        return this._items.skip(offset);
    }

    public skipWhile(condition: IteratorFunction<T, boolean>): ReadOnlyCollection<T> {
        return this._items.skipWhile(condition);
    }

    public slice(offset: number): ReadOnlyCollection<T>;

    public slice(offset: number, length: number): ReadOnlyCollection<T>;

    public slice(offset: number, length: number = this.length - offset): ReadOnlyCollection<T> {
        return this._items.slice(offset, length);
    }

    public sum(selector: IteratorFunction<T, number>): number {
        return this._items.sum(selector);
    }

    public take(length: number): ReadOnlyCollection<T> {
        return this._items.take(length);
    }

    public takeWhile(condition: IteratorFunction<T, boolean>): ReadOnlyCollection<T> {
        return this._items.takeWhile(condition);
    }

    public toArray(): T[] {
        return this._items.toArray();
    }

    public toJSON(): T[] {
        return this._items.toJSON();
    }

    public union(otherList: Sequence<T>): ReadOnlyCollection<T>;

    public union(otherList: Sequence<T>, comparator: EqualityComparator<T>): ReadOnlyCollection<T>;

    public union(otherList: Sequence<T>, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): ReadOnlyCollection<T> {
        return this._items.union(otherList, comparator);
    }

    public zip<TOther, TResult>(
        otherList: Sequence<TOther>,
        resultSelector: CombineFunction<T, TOther, TResult>
    ): ReadOnlyCollection<TResult> {
        return this._items.zip(otherList, resultSelector);
    }
}
