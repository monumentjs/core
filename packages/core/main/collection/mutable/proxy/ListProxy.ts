import {List} from '../List';
import {Sequence} from '../../readonly/Sequence';
import {IteratorFunction} from '../../IteratorFunction';
import {EqualityComparator} from '../../../utils/comparison/EqualityComparator';
import {Grouping} from '../../Grouping';
import {CombineFunction} from '../../CombineFunction';
import {Comparator} from '../../../utils/comparison/Comparator';
import {SortOrder} from '../../SortOrder';
import {CollectionProxy} from './CollectionProxy';


export abstract class ListProxy<T, TItems extends List<T>> extends CollectionProxy<T, TItems> implements List<T> {

    public get firstIndex(): number {
        return this._items.firstIndex;
    }

    public get lastIndex(): number {
        return this._items.lastIndex;
    }

    public aggregate<TAggregate>(iterator: (lastSeed: TAggregate, item: T, index: number) => TAggregate, initialSeed: TAggregate): TAggregate {
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

    public concat(otherList: Sequence<T>): List<T> {
        return this._items.concat(otherList);
    }

    public count(predicate: IteratorFunction<T, boolean>): number {
        return this._items.count(predicate);
    }

    public distinct(): List<T>;
    public distinct(comparator: EqualityComparator<T>): List<T>;
    public distinct(comparator?: EqualityComparator<T>): List<T> {
        // @ts-ignore
        return this._items.distinct(...arguments);
    }

    public except(otherList: Sequence<T>): List<T>;
    public except(otherList: Sequence<T>, comparator: EqualityComparator<T>): List<T>;
    public except(otherList: Sequence<T>, comparator?: EqualityComparator<T>): List<T> {
        // @ts-ignore
        return this._items.except(...arguments);
    }

    public findAll(predicate: IteratorFunction<T, boolean>): List<T> {
        return this._items.findAll(predicate);
    }

    public first(predicate: IteratorFunction<T, boolean>): T | undefined;
    public first(predicate: IteratorFunction<T, boolean>, defaultValue: T): T;
    public first(predicate: IteratorFunction<T, boolean>, defaultValue?: T): T | undefined {
        // @ts-ignore
        return this._items.first(...arguments);
    }

    public firstOrDefault(defaultValue: T): T {
        return this._items.firstOrDefault(defaultValue);
    }

    public getAt(index: number): T {
        return this._items.getAt(index);
    }

    public groupBy<TKey>(keySelector: IteratorFunction<T, TKey>): List<Grouping<TKey, T>>;
    public groupBy<TKey>(keySelector: IteratorFunction<T, TKey>, keyComparator: EqualityComparator<TKey>): List<Grouping<TKey, T>>;
    public groupBy<TKey>(keySelector: IteratorFunction<T, TKey>, keyComparator?: EqualityComparator<TKey>): List<Grouping<TKey, T>> {
        // @ts-ignore
        return this._items.groupBy(...arguments);
    }

    public indexOf(item: T): number;
    public indexOf(item: T, comparator: EqualityComparator<T>): number;
    public indexOf(item: T, startIndex: number): number;
    public indexOf(item: T, startIndex: number, comparator: EqualityComparator<T>): number;
    public indexOf(item: T, startIndex: number, count: number): number;
    public indexOf(item: T, startIndex: number, count: number, comparator: EqualityComparator<T>): number;
    public indexOf(item: T, startIndex?: EqualityComparator<T> | number, count?: EqualityComparator<T> | number, comparator?: EqualityComparator<T>): number {
        // @ts-ignore
        return this._items.indexOf(...arguments);
    }

    public insert(index: number, item: T): boolean {
        return this._items.insert(index, item);
    }

    public insertAll(index: number, items: Sequence<T>): boolean {
        return this._items.insertAll(index, items);
    }

    public intersect(otherList: Sequence<T>): List<T>;
    public intersect(otherList: Sequence<T>, comparator: EqualityComparator<T>): List<T>;
    public intersect(otherList: Sequence<T>, comparator?: EqualityComparator<T>): List<T> {
        // @ts-ignore
        return this._items.intersect(...arguments);
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
        return this._items.join(...arguments);
    }

    public last(predicate: IteratorFunction<T, boolean>): T | undefined;
    public last(predicate: IteratorFunction<T, boolean>, defaultValue: T): T;
    public last(predicate: IteratorFunction<T, boolean>, defaultValue?: T): T | undefined {
        // @ts-ignore
        return this._items.last(...arguments);
    }

    public lastIndexOf(item: T): number;
    public lastIndexOf(item: T, comparator: EqualityComparator<T>): number;
    public lastIndexOf(item: T, startIndex: number): number;
    public lastIndexOf(item: T, startIndex: number, comparator: EqualityComparator<T>): number;
    public lastIndexOf(item: T, startIndex: number, count: number): number;
    public lastIndexOf(item: T, startIndex: number, count: number, comparator: EqualityComparator<T>): number;
    public lastIndexOf(item: T, startIndex?: EqualityComparator<T> | number, count?: EqualityComparator<T> | number, comparator?: EqualityComparator<T>): number {
        // @ts-ignore
        return this._items.lastIndexOf(...arguments);
    }

    public lastOrDefault(defaultValue: T): T {
        return this._items.lastOrDefault(defaultValue);
    }

    public map<TResult>(selector: IteratorFunction<T, TResult>): List<TResult> {
        return this._items.map(selector);
    }

    public max(selector: IteratorFunction<T, number>): number {
        return this._items.max(selector);
    }

    public min(selector: IteratorFunction<T, number>): number {
        return this._items.min(selector);
    }

    public orderBy<TKey>(keySelector: (actualItem: T) => TKey, keyComparator: Comparator<TKey>): List<T>;
    public orderBy<TKey>(keySelector: (actualItem: T) => TKey, keyComparator: Comparator<TKey>, sortOrder: SortOrder): List<T>;
    public orderBy<TKey>(keySelector: (actualItem: T) => TKey, keyComparator: Comparator<TKey>, sortOrder?: SortOrder): List<T> {
        // @ts-ignore
        return this._items.orderBy(...arguments);
    }

    public removeAt(index: number): T {
        return this._items.removeAt(index);
    }

    public reverse(): List<T> {
        return this._items.reverse();
    }

    public selectMany<TInnerItem, TResult>(
        collectionSelector: IteratorFunction<T, Sequence<TInnerItem>>,
        resultSelector: CombineFunction<T, TInnerItem, TResult>
    ): List<TResult> {
        return this._items.selectMany(collectionSelector, resultSelector);
    }

    public setAt(index: number, newValue: T): T {
        return this._items.setAt(index, newValue);
    }

    public skip(offset: number): List<T> {
        return this._items.skip(offset);
    }

    public skipWhile(condition: IteratorFunction<T, boolean>): List<T> {
        return this._items.skipWhile(condition);
    }

    public slice(offset: number): List<T>;
    public slice(offset: number, length: number): List<T>;
    public slice(offset: number, length?: number): List<T> {
        // @ts-ignore
        return this._items.slice(...arguments);
    }

    public take(length: number): List<T> {
        return this._items.take(length);
    }

    public takeWhile(condition: IteratorFunction<T, boolean>): List<T> {
        return this._items.takeWhile(condition);
    }

    public union(otherList: Sequence<T>): List<T>;
    public union(otherList: Sequence<T>, comparator: EqualityComparator<T>): List<T>;
    public union(otherList: Sequence<T>, comparator?: EqualityComparator<T>): List<T> {
        // @ts-ignore
        return this._items.union(otherList, comparator);
    }

    public zip<TOther, TResult>(otherList: Sequence<TOther>, resultSelector: CombineFunction<T, TOther, TResult>): List<TResult> {
        return this._items.zip(otherList, resultSelector);
    }
}
