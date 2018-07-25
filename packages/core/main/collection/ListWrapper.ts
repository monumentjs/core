import {List} from './List';
import {Sequence} from './Sequence';
import {IteratorFunction} from './IteratorFunction';
import {EqualityComparator} from '../EqualityComparator';
import {Grouping} from './Grouping';
import {CombineFunction} from './CombineFunction';
import {Comparator} from '../Comparator';
import {SortOrder} from './SortOrder';
import {AbstractSequence} from './AbstractSequence';


export abstract class ListWrapper<T> extends AbstractSequence<T> implements List<T> {
    private readonly _list: List<T>;

    public get firstIndex(): number {
        return this._list.firstIndex;
    }

    public get isEmpty(): boolean {
        return this._list.isEmpty;
    }

    public get lastIndex(): number {
        return this._list.lastIndex;
    }

    public get length(): number {
        return this._list.length;
    }

    protected constructor(list: List<T>) {
        super();

        this._list = list;
    }

    public [Symbol.iterator](): Iterator<T> {
        return this._list[Symbol.iterator]();
    }

    public add(item: T): boolean {
        return this._list.add(item);
    }

    public addAll(items: Sequence<T>): boolean {
        return this._list.addAll(items);
    }

    public aggregate<TAggregate>(iterator: (lastSeed: TAggregate, item: T, index: number) => TAggregate, initialSeed: TAggregate): TAggregate {
        return this._list.aggregate(iterator, initialSeed);
    }

    public all(predicate: IteratorFunction<T, boolean>): boolean {
        return this._list.all(predicate);
    }

    public any(predicate: IteratorFunction<T, boolean>): boolean {
        return this._list.any(predicate);
    }

    public average(selector: IteratorFunction<T, number>): number {
        return this._list.average(selector);
    }

    public clear(): boolean {
        return this._list.clear();
    }

    public concat(otherList: Sequence<T>): List<T> {
        return this._list.concat(otherList);
    }

    public contains(item: T): boolean;
    public contains(item: T, comparator: EqualityComparator<T>): boolean;
    public contains(item: T, comparator?: EqualityComparator<T>): boolean {
        // @ts-ignore
        return this._list.contains(...arguments);
    }

    public containsAll(items: Sequence<T>): boolean;
    public containsAll(items: Sequence<T>, comparator: EqualityComparator<T>): boolean;
    public containsAll(items: Sequence<T>, comparator?: EqualityComparator<T>): boolean {
        // @ts-ignore
        return this._list.containsAll(...arguments);
    }

    public count(predicate: IteratorFunction<T, boolean>): number {
        return this._list.count(predicate);
    }

    public distinct(): List<T>;
    public distinct(comparator: EqualityComparator<T>): List<T>;
    public distinct(comparator?: EqualityComparator<T>): List<T> {
        // @ts-ignore
        return this._list.distinct(...arguments);
    }

    public except(otherList: Sequence<T>): List<T>;
    public except(otherList: Sequence<T>, comparator: EqualityComparator<T>): List<T>;
    public except(otherList: Sequence<T>, comparator?: EqualityComparator<T>): List<T> {
        // @ts-ignore
        return this._list.except(...arguments);
    }

    public findAll(predicate: IteratorFunction<T, boolean>): List<T> {
        return this._list.findAll(predicate);
    }

    public first(predicate: IteratorFunction<T, boolean>): T | undefined;
    public first(predicate: IteratorFunction<T, boolean>, defaultValue: T): T;
    public first(predicate: IteratorFunction<T, boolean>, defaultValue?: T): T | undefined {
        // @ts-ignore
        return this._list.first(...arguments);
    }

    public firstOrDefault(defaultValue: T): T {
        return this._list.firstOrDefault(defaultValue);
    }

    public forEach(iterator: IteratorFunction<T, boolean | void>): void;
    public forEach(iterator: IteratorFunction<T, boolean | void>, startIndex: number): void;
    public forEach(iterator: IteratorFunction<T, boolean | void>, startIndex: number, count: number): void;
    public forEach(iterator: IteratorFunction<T, boolean | void>, startIndex?: number, count?: number): void {
        // @ts-ignore
        this._list.forEach(...arguments);
    }

    public forEachReversed(iterator: IteratorFunction<T, boolean | void>): void;
    public forEachReversed(iterator: IteratorFunction<T, boolean | void>, startIndex: number): void;
    public forEachReversed(iterator: IteratorFunction<T, boolean | void>, startIndex: number, count: number): void;
    public forEachReversed(iterator: IteratorFunction<T, boolean | void>, startIndex?: number, count?: number): void {
        // @ts-ignore
        this._list.forEachReversed(...arguments);
    }

    public getAt(index: number): T {
        return this._list.getAt(index);
    }

    public groupBy<TKey>(keySelector: IteratorFunction<T, TKey>): List<Grouping<TKey, T>>;
    public groupBy<TKey>(keySelector: IteratorFunction<T, TKey>, keyComparator: EqualityComparator<TKey>): List<Grouping<TKey, T>>;
    public groupBy<TKey>(keySelector: IteratorFunction<T, TKey>, keyComparator?: EqualityComparator<TKey>): List<Grouping<TKey, T>> {
        // @ts-ignore
        return this._list.groupBy(...arguments);
    }

    public indexOf(item: T): number;
    public indexOf(item: T, comparator: EqualityComparator<T>): number;
    public indexOf(item: T, startIndex: number): number;
    public indexOf(item: T, startIndex: number, comparator: EqualityComparator<T>): number;
    public indexOf(item: T, startIndex: number, count: number): number;
    public indexOf(item: T, startIndex: number, count: number, comparator: EqualityComparator<T>): number;
    public indexOf(item: T, startIndex?: EqualityComparator<T> | number, count?: EqualityComparator<T> | number, comparator?: EqualityComparator<T>): number {
        // @ts-ignore
        return this._list.indexOf(...arguments);
    }

    public insert(index: number, item: T): boolean {
        return this._list.insert(index, item);
    }

    public insertAll(index: number, items: Sequence<T>): boolean {
        return this._list.insertAll(index, items);
    }

    public intersect(otherList: Sequence<T>): List<T>;
    public intersect(otherList: Sequence<T>, comparator: EqualityComparator<T>): List<T>;
    public intersect(otherList: Sequence<T>, comparator?: EqualityComparator<T>): List<T> {
        // @ts-ignore
        return this._list.intersect(...arguments);
    }

    public join<TOuter, TKey, TResult>(
        outerList: Sequence<TOuter>,
        outerKeySelector: IteratorFunction<TOuter, TKey>,
        innerKeySelector: IteratorFunction<T, TKey>,
        resultSelector: CombineFunction<T, TOuter, TResult>
    ): List<TResult>;
    public join<TOuter, TKey, TResult>(
        outerList: Sequence<TOuter>,
        outerKeySelector: IteratorFunction<TOuter, TKey>,
        innerKeySelector: IteratorFunction<T, TKey>,
        resultSelector: CombineFunction<T, TOuter, TResult>,
        keyComparator: EqualityComparator<TKey>
    ): List<TResult>;
    public join<TOuter, TKey, TResult>(
        outerList: Sequence<TOuter>,
        outerKeySelector: IteratorFunction<TOuter, TKey>,
        innerKeySelector: IteratorFunction<T, TKey>,
        resultSelector: CombineFunction<T, TOuter, TResult>,
        keyComparator?: EqualityComparator<TKey>
    ): List<TResult> {
        // @ts-ignore
        return this._list.join(...arguments);
    }

    public last(predicate: IteratorFunction<T, boolean>): T | undefined;
    public last(predicate: IteratorFunction<T, boolean>, defaultValue: T): T;
    public last(predicate: IteratorFunction<T, boolean>, defaultValue?: T): T | undefined {
        // @ts-ignore
        return this._list.last(...arguments);
    }

    public lastIndexOf(item: T): number;
    public lastIndexOf(item: T, comparator: EqualityComparator<T>): number;
    public lastIndexOf(item: T, startIndex: number): number;
    public lastIndexOf(item: T, startIndex: number, comparator: EqualityComparator<T>): number;
    public lastIndexOf(item: T, startIndex: number, count: number): number;
    public lastIndexOf(item: T, startIndex: number, count: number, comparator: EqualityComparator<T>): number;
    public lastIndexOf(item: T, startIndex?: EqualityComparator<T> | number, count?: EqualityComparator<T> | number, comparator?: EqualityComparator<T>): number {
        // @ts-ignore
        return this._list.lastIndexOf(...arguments);
    }

    public lastOrDefault(defaultValue: T): T {
        return this._list.lastOrDefault(defaultValue);
    }

    public map<TResult>(selector: IteratorFunction<T, TResult>): List<TResult> {
        return this._list.map(selector);
    }

    public max(selector: IteratorFunction<T, number>): number {
        return this._list.max(selector);
    }

    public min(selector: IteratorFunction<T, number>): number {
        return this._list.min(selector);
    }

    public orderBy<TKey>(keySelector: (actualItem: T) => TKey, keyComparator: Comparator<TKey>, sortOrder: SortOrder): List<T> {
        return this._list.orderBy(keySelector, keyComparator, sortOrder);
    }

    public remove(item: T): boolean;
    public remove(item: T, comparator: EqualityComparator<T>): boolean;
    public remove(item: T, comparator?: EqualityComparator<T>): boolean {
        // @ts-ignore
        return this._list.remove(...arguments);
    }

    public removeAll(items: Sequence<T>): boolean;
    public removeAll(items: Sequence<T>, comparator: EqualityComparator<T>): boolean;
    public removeAll(items: Sequence<T>, comparator?: EqualityComparator<T>): boolean {
        // @ts-ignore
        return this._list.removeAll(...arguments);
    }

    public removeAt(index: number): T {
        return this._list.removeAt(index);
    }

    public removeBy(predicate: IteratorFunction<T, boolean>): boolean {
        return this._list.removeBy(predicate);
    }

    public retainAll(items: Sequence<T>): boolean;
    public retainAll(items: Sequence<T>, comparator: EqualityComparator<T>): boolean;
    public retainAll(items: Sequence<T>, comparator?: EqualityComparator<T>): boolean {
        // @ts-ignore
        return this._list.retainAll(...arguments);
    }

    public reverse(): List<T> {
        return this._list.reverse();
    }

    public setAt(index: number, newValue: T): T {
        return this._list.setAt(index, newValue);
    }

    public skip(offset: number): List<T> {
        return this._list.skip(offset);
    }

    public skipWhile(condition: IteratorFunction<T, boolean>): List<T> {
        return this._list.skipWhile(condition);
    }

    public slice(offset: number): List<T>;
    public slice(offset: number, length: number): List<T>;
    public slice(offset: number, length?: number): List<T> {
        // @ts-ignore
        return this._list.slice(...arguments);
    }

    public take(length: number): List<T> {
        return this._list.take(length);
    }

    public takeWhile(condition: IteratorFunction<T, boolean>): List<T> {
        return this._list.takeWhile(condition);
    }

    public toArray(): T[] {
        return this._list.toArray();
    }

    public union(otherList: Sequence<T>): List<T>;
    public union(otherList: Sequence<T>, comparator: EqualityComparator<T>): List<T>;
    public union(otherList: Sequence<T>, comparator?: EqualityComparator<T>): List<T> {
        // @ts-ignore
        return this._list.union(otherList, comparator);
    }

    public zip<TOther, TResult>(otherList: Sequence<TOther>, resultSelector: CombineFunction<T, TOther, TResult>): List<TResult> {
        return this._list.zip(otherList, resultSelector);
    }
}
