import {Sequence} from '../../base/Sequence';
import {AggregateFunction, CombineFunction, IteratorFunction, ReadOnlyCollection, SelectorFunction} from './ReadOnlyCollection';
import {ReadOnlyCollectionImpl} from './ReadOnlyCollectionImpl';
import {EqualityComparator} from '../../../comparison/equality/EqualityComparator';
import {StrictEqualityComparator} from '../../../comparison/equality/StrictEqualityComparator';
import {SortOrder} from '../../../comparison/order/SortOrder';
import {Comparator} from '../../../comparison/order/Comparator';
import {ReadOnlyMultiValueMap} from '../../multivaluemap/readonly/ReadOnlyMultiValueMap';

export abstract class ReadOnlyCollectionBase<T> implements ReadOnlyCollection<T> {
    public readonly abstract length: number;

    public get isEmpty(): boolean {
        return this.length === 0;
    }

    public abstract [Symbol.iterator](): Iterator<T>;

    public aggregate<TAggregate>(
        iterator: AggregateFunction<T, TAggregate>,
        initialSeed: TAggregate
    ): TAggregate {
        return new ReadOnlyCollectionImpl(this).aggregate(iterator, initialSeed);
    }

    public all(predicate: IteratorFunction<T, boolean>): boolean {
        return new ReadOnlyCollectionImpl(this).all(predicate);
    }

    public any(predicate: IteratorFunction<T, boolean>): boolean {
        return new ReadOnlyCollectionImpl(this).any(predicate);
    }

    public average(selector: IteratorFunction<T, number>): number {
        return new ReadOnlyCollectionImpl(this).average(selector);
    }

    public concat(otherList: Sequence<T>, ...others: Array<Sequence<T>>): ReadOnlyCollection<T> {
        return new ReadOnlyCollectionImpl(this).concat(otherList, ...others);
    }

    public contains(otherItem: T): boolean;

    public contains(otherItem: T, comparator: EqualityComparator<T>): boolean;

    public contains(otherItem: T, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): boolean {
        return new ReadOnlyCollectionImpl(this).contains(otherItem, comparator);
    }

    public containsAll(items: Sequence<T>): boolean;

    public containsAll(items: Sequence<T>, comparator: EqualityComparator<T>): boolean;

    public containsAll(items: Sequence<T>, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): boolean {
        return new ReadOnlyCollectionImpl(this).containsAll(items, comparator);
    }

    public count(predicate: IteratorFunction<T, boolean>): number {
        return new ReadOnlyCollectionImpl(this).count(predicate);
    }

    /**
     * Returns distinct elements from a sequence by using a specified EqualityComparator to compare values.
     */
    public distinct(): ReadOnlyCollection<T>;

    public distinct(comparator: EqualityComparator<T>): ReadOnlyCollection<T>;

    public distinct(comparator: EqualityComparator<T> = StrictEqualityComparator.get()): ReadOnlyCollection<T> {
        return new ReadOnlyCollectionImpl(this).distinct(comparator);
    }

    public entries(): Iterable<[T, number]> {
        return new ReadOnlyCollectionImpl(this).entries();
    }

    public equals(otherList: Sequence<T>): boolean;

    public equals(otherList: Sequence<T>, comparator: EqualityComparator<T>): boolean;

    public equals(otherList: Sequence<T>, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): boolean {
        return new ReadOnlyCollectionImpl(this).equals(otherList, comparator);
    }

    public except(otherList: Sequence<T>): ReadOnlyCollection<T>;

    public except(otherList: Sequence<T>, comparator: EqualityComparator<T>): ReadOnlyCollection<T>;

    public except(otherList: Sequence<T>, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): ReadOnlyCollection<T> {
        return new ReadOnlyCollectionImpl(this).except(otherList, comparator);
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
        return new ReadOnlyCollectionImpl(this).findAll(predicate, limit, offset);
    }

    public first(predicate: IteratorFunction<T, boolean>): T | undefined;

    public first(predicate: IteratorFunction<T, boolean>, defaultValue: T): T;

    public first(predicate: IteratorFunction<T, boolean>, defaultValue?: T): T | undefined {
        if (defaultValue === undefined) {
            return new ReadOnlyCollectionImpl(this).first(predicate);
        }

        return new ReadOnlyCollectionImpl(this).first(predicate, defaultValue);
    }

    public firstOrDefault(defaultValue: T): T {
        return new ReadOnlyCollectionImpl(this).firstOrDefault(defaultValue);
    }

    public forEach(iterator: IteratorFunction<T, false | void>): void;

    public forEach(iterator: IteratorFunction<T, false | void>, startIndex: number): void;

    public forEach(iterator: IteratorFunction<T, false | void>, startIndex: number, count: number): void;

    public forEach(iterator: IteratorFunction<T, false | void>, startIndex: number = 0, count: number = this.length - startIndex): void {
        new ReadOnlyCollectionImpl(this).forEach(iterator, startIndex, count);
    }

    public forEachBack(iterator: IteratorFunction<T, false | void>): void;

    public forEachBack(iterator: IteratorFunction<T, false | void>, startIndex: number): void;

    public forEachBack(iterator: IteratorFunction<T, false | void>, startIndex: number, count: number): void;

    public forEachBack(
        iterator: IteratorFunction<T, false | void>,
        startIndex: number = Math.max(this.length - 1, 0),
        count: number = startIndex + (this.length ? 1 : 0)
    ): void {
        new ReadOnlyCollectionImpl(this).forEachBack(iterator, startIndex, count);
    }

    public groupBy<TKey>(
        keySelector: IteratorFunction<T, TKey>
    ): ReadOnlyMultiValueMap<TKey, T>;

    public groupBy<TKey>(
        keySelector: IteratorFunction<T, TKey>,
        keyComparator: EqualityComparator<TKey>
    ): ReadOnlyMultiValueMap<TKey, T>;

    public groupBy<TKey>(
        keySelector: IteratorFunction<T, TKey>,
        keyComparator: EqualityComparator<TKey> = StrictEqualityComparator.get()
    ): ReadOnlyMultiValueMap<TKey, T> {
        return new ReadOnlyCollectionImpl(this).groupBy(keySelector, keyComparator);
    }

    public intersect(otherList: Sequence<T>): ReadOnlyCollection<T>;

    public intersect(otherList: Sequence<T>, comparator: EqualityComparator<T>): ReadOnlyCollection<T>;

    public intersect(otherList: Sequence<T>, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): ReadOnlyCollection<T> {
        return new ReadOnlyCollectionImpl(this).intersect(otherList, comparator);
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
        return new ReadOnlyCollectionImpl(this).join(outerList, outerKeySelector, innerKeySelector, resultSelector, keyComparator);
    }

    public last(predicate: IteratorFunction<T, boolean>): T | undefined;

    public last(predicate: IteratorFunction<T, boolean>, defaultValue: T): T;

    public last(predicate: IteratorFunction<T, boolean>, defaultValue?: T): T | undefined {
        if (defaultValue === undefined) {
            return new ReadOnlyCollectionImpl(this).last(predicate);
        }

        return new ReadOnlyCollectionImpl(this).last(predicate, defaultValue);
    }

    public lastOrDefault(defaultValue: T): T {
        return new ReadOnlyCollectionImpl(this).lastOrDefault(defaultValue);
    }

    public map<TResult>(selector: IteratorFunction<T, TResult>): ReadOnlyCollection<TResult> {
        return new ReadOnlyCollectionImpl(this).map(selector);
    }

    public max(selector: IteratorFunction<T, number>): number {
        return new ReadOnlyCollectionImpl(this).max(selector);
    }

    public min(selector: IteratorFunction<T, number>): number {
        return new ReadOnlyCollectionImpl(this).min(selector);
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
        return new ReadOnlyCollectionImpl(this).orderBy(keySelector, comparator, sortOrder);
    }

    public random(): T {
        return new ReadOnlyCollectionImpl(this).random();
    }

    public reverse(): ReadOnlyCollection<T> {
        return new ReadOnlyCollectionImpl(this).reverse();
    }

    public selectMany<TInnerItem, TResult>(
        sequenceSelector: IteratorFunction<T, Sequence<TInnerItem>>,
        resultSelector: CombineFunction<T, TInnerItem, TResult>
    ): ReadOnlyCollection<TResult> {
        return new ReadOnlyCollectionImpl(this).selectMany(sequenceSelector, resultSelector);
    }

    public skip(offset: number): ReadOnlyCollection<T> {
        return new ReadOnlyCollectionImpl(this).skip(offset);
    }

    public skipWhile(predicate: IteratorFunction<T, boolean>): ReadOnlyCollection<T> {
        return new ReadOnlyCollectionImpl(this).skipWhile(predicate);
    }

    public slice(offset: number): ReadOnlyCollection<T>;

    public slice(offset: number, length: number): ReadOnlyCollection<T>;

    public slice(offset: number, length: number = this.length - offset): ReadOnlyCollection<T> {
        return new ReadOnlyCollectionImpl(this).slice(offset, length);
    }

    public sum(selector: IteratorFunction<T, number>): number {
        return new ReadOnlyCollectionImpl(this).sum(selector);
    }

    public take(length: number): ReadOnlyCollection<T> {
        return new ReadOnlyCollectionImpl(this).take(length);
    }

    public takeWhile(predicate: IteratorFunction<T, boolean>): ReadOnlyCollection<T> {
        return new ReadOnlyCollectionImpl(this).takeWhile(predicate);
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
        return new ReadOnlyCollectionImpl(this).union(otherList, comparator);
    }

    public zip<TOther, TResult>(
        otherList: Sequence<TOther>,
        resultSelector: CombineFunction<T, TOther, TResult>
    ): ReadOnlyCollection<TResult> {
        return new ReadOnlyCollectionImpl(this).zip(otherList, resultSelector);
    }

}
