import {List} from '../List';
import {Sequence} from '../../readonly/Sequence';
import {IteratorFunction} from '../../IteratorFunction';
import {EqualityComparator} from '../../../utils/comparison/EqualityComparator';
import {Grouping} from '../../Grouping';
import {CombineFunction} from '../../CombineFunction';
import {Comparator} from '../../../utils/comparison/Comparator';
import {SortOrder} from '../../SortOrder';
import {CollectionProxy} from './CollectionProxy';


export abstract class ListProxy<TItem, TItems extends List<TItem>> extends CollectionProxy<TItem, TItems> implements List<TItem> {

    public get firstIndex(): number {
        return this._items.firstIndex;
    }

    public get lastIndex(): number {
        return this._items.lastIndex;
    }

    public aggregate<TAggregate>(iterator: (lastSeed: TAggregate, item: TItem, index: number) => TAggregate, initialSeed: TAggregate): TAggregate {
        return this._items.aggregate(iterator, initialSeed);
    }

    public all(predicate: IteratorFunction<TItem, boolean>): boolean {
        return this._items.all(predicate);
    }

    public any(predicate: IteratorFunction<TItem, boolean>): boolean {
        return this._items.any(predicate);
    }

    public average(selector: IteratorFunction<TItem, number>): number {
        return this._items.average(selector);
    }

    public concat(otherList: Sequence<TItem>): List<TItem> {
        return this._items.concat(otherList);
    }

    public count(predicate: IteratorFunction<TItem, boolean>): number {
        return this._items.count(predicate);
    }

    public distinct(): List<TItem>;
    public distinct(comparator: EqualityComparator<TItem>): List<TItem>;
    public distinct(comparator?: EqualityComparator<TItem>): List<TItem> {
        // @ts-ignore
        return this._items.distinct(...arguments);
    }

    public except(otherList: Sequence<TItem>): List<TItem>;
    public except(otherList: Sequence<TItem>, comparator: EqualityComparator<TItem>): List<TItem>;
    public except(otherList: Sequence<TItem>, comparator?: EqualityComparator<TItem>): List<TItem> {
        // @ts-ignore
        return this._items.except(...arguments);
    }

    public findAll(predicate: IteratorFunction<TItem, boolean>): List<TItem> {
        return this._items.findAll(predicate);
    }

    public first(predicate: IteratorFunction<TItem, boolean>): TItem | undefined;
    public first(predicate: IteratorFunction<TItem, boolean>, defaultValue: TItem): TItem;
    public first(predicate: IteratorFunction<TItem, boolean>, defaultValue?: TItem): TItem | undefined {
        // @ts-ignore
        return this._items.first(...arguments);
    }

    public firstOrDefault(defaultValue: TItem): TItem {
        return this._items.firstOrDefault(defaultValue);
    }

    public getAt(index: number): TItem {
        return this._items.getAt(index);
    }

    public groupBy<TKey>(keySelector: IteratorFunction<TItem, TKey>): List<Grouping<TKey, TItem>>;
    public groupBy<TKey>(keySelector: IteratorFunction<TItem, TKey>, keyComparator: EqualityComparator<TKey>): List<Grouping<TKey, TItem>>;
    public groupBy<TKey>(keySelector: IteratorFunction<TItem, TKey>, keyComparator?: EqualityComparator<TKey>): List<Grouping<TKey, TItem>> {
        // @ts-ignore
        return this._items.groupBy(...arguments);
    }

    public indexOf(item: TItem): number;
    public indexOf(item: TItem, comparator: EqualityComparator<TItem>): number;
    public indexOf(item: TItem, startIndex: number): number;
    public indexOf(item: TItem, startIndex: number, comparator: EqualityComparator<TItem>): number;
    public indexOf(item: TItem, startIndex: number, count: number): number;
    public indexOf(item: TItem, startIndex: number, count: number, comparator: EqualityComparator<TItem>): number;
    public indexOf(item: TItem, startIndex?: EqualityComparator<TItem> | number, count?: EqualityComparator<TItem> | number, comparator?: EqualityComparator<TItem>): number {
        // @ts-ignore
        return this._items.indexOf(...arguments);
    }

    public insert(index: number, item: TItem): boolean {
        return this._items.insert(index, item);
    }

    public insertAll(index: number, items: Sequence<TItem>): boolean {
        return this._items.insertAll(index, items);
    }

    public intersect(otherList: Sequence<TItem>): List<TItem>;
    public intersect(otherList: Sequence<TItem>, comparator: EqualityComparator<TItem>): List<TItem>;
    public intersect(otherList: Sequence<TItem>, comparator?: EqualityComparator<TItem>): List<TItem> {
        // @ts-ignore
        return this._items.intersect(...arguments);
    }

    public join<TOuter, TKey, TResult>(
        outerList: Sequence<TOuter>,
        outerKeySelector: IteratorFunction<TOuter, TKey>,
        innerKeySelector: IteratorFunction<TItem, TKey>,
        resultSelector: CombineFunction<TItem, TOuter, TResult>
    ): List<TResult>;
    public join<TOuter, TKey, TResult>(
        outerList: Sequence<TOuter>,
        outerKeySelector: IteratorFunction<TOuter, TKey>,
        innerKeySelector: IteratorFunction<TItem, TKey>,
        resultSelector: CombineFunction<TItem, TOuter, TResult>,
        keyComparator: EqualityComparator<TKey>
    ): List<TResult>;
    public join<TOuter, TKey, TResult>(
        outerList: Sequence<TOuter>,
        outerKeySelector: IteratorFunction<TOuter, TKey>,
        innerKeySelector: IteratorFunction<TItem, TKey>,
        resultSelector: CombineFunction<TItem, TOuter, TResult>,
        keyComparator?: EqualityComparator<TKey>
    ): List<TResult> {
        // @ts-ignore
        return this._items.join(...arguments);
    }

    public last(predicate: IteratorFunction<TItem, boolean>): TItem | undefined;
    public last(predicate: IteratorFunction<TItem, boolean>, defaultValue: TItem): TItem;
    public last(predicate: IteratorFunction<TItem, boolean>, defaultValue?: TItem): TItem | undefined {
        // @ts-ignore
        return this._items.last(...arguments);
    }

    public lastIndexOf(item: TItem): number;
    public lastIndexOf(item: TItem, comparator: EqualityComparator<TItem>): number;
    public lastIndexOf(item: TItem, startIndex: number): number;
    public lastIndexOf(item: TItem, startIndex: number, comparator: EqualityComparator<TItem>): number;
    public lastIndexOf(item: TItem, startIndex: number, count: number): number;
    public lastIndexOf(item: TItem, startIndex: number, count: number, comparator: EqualityComparator<TItem>): number;
    public lastIndexOf(item: TItem, startIndex?: EqualityComparator<TItem> | number, count?: EqualityComparator<TItem> | number, comparator?: EqualityComparator<TItem>): number {
        // @ts-ignore
        return this._items.lastIndexOf(...arguments);
    }

    public lastOrDefault(defaultValue: TItem): TItem {
        return this._items.lastOrDefault(defaultValue);
    }

    public map<TResult>(selector: IteratorFunction<TItem, TResult>): List<TResult> {
        return this._items.map(selector);
    }

    public max(selector: IteratorFunction<TItem, number>): number {
        return this._items.max(selector);
    }

    public min(selector: IteratorFunction<TItem, number>): number {
        return this._items.min(selector);
    }

    public orderBy<TKey>(keySelector: (actualItem: TItem) => TKey, keyComparator: Comparator<TKey>, sortOrder: SortOrder): List<TItem> {
        return this._items.orderBy(keySelector, keyComparator, sortOrder);
    }

    public removeAt(index: number): TItem {
        return this._items.removeAt(index);
    }

    public reverse(): List<TItem> {
        return this._items.reverse();
    }

    public selectMany<TInnerItem, TResult>(
        collectionSelector: IteratorFunction<TItem, Sequence<TInnerItem>>,
        resultSelector: CombineFunction<TItem, TInnerItem, TResult>
    ): List<TResult> {
        return this._items.selectMany(collectionSelector, resultSelector);
    }

    public setAt(index: number, newValue: TItem): TItem {
        return this._items.setAt(index, newValue);
    }

    public skip(offset: number): List<TItem> {
        return this._items.skip(offset);
    }

    public skipWhile(condition: IteratorFunction<TItem, boolean>): List<TItem> {
        return this._items.skipWhile(condition);
    }

    public slice(offset: number): List<TItem>;
    public slice(offset: number, length: number): List<TItem>;
    public slice(offset: number, length?: number): List<TItem> {
        // @ts-ignore
        return this._items.slice(...arguments);
    }

    public take(length: number): List<TItem> {
        return this._items.take(length);
    }

    public takeWhile(condition: IteratorFunction<TItem, boolean>): List<TItem> {
        return this._items.takeWhile(condition);
    }

    public union(otherList: Sequence<TItem>): List<TItem>;
    public union(otherList: Sequence<TItem>, comparator: EqualityComparator<TItem>): List<TItem>;
    public union(otherList: Sequence<TItem>, comparator?: EqualityComparator<TItem>): List<TItem> {
        // @ts-ignore
        return this._items.union(otherList, comparator);
    }

    public zip<TOther, TResult>(otherList: Sequence<TOther>, resultSelector: CombineFunction<TItem, TOther, TResult>): List<TResult> {
        return this._items.zip(otherList, resultSelector);
    }
}
