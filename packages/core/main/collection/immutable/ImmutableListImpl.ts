import {EqualityComparator} from '../../utils/comparison/EqualityComparator';
import {IteratorFunction} from '../IteratorFunction';
import {ReadOnlyList} from '../readonly/ReadOnlyList';
import {Grouping} from '../Grouping';
import {CombineFunction} from '../CombineFunction';
import {SortOrder} from '../SortOrder';
import {Comparator} from '../../utils/comparison/Comparator';
import {Sequence} from '../readonly/Sequence';
import {ImmutableList} from './ImmutableList';
import {Cloneable} from '../../Cloneable';
import {ArrayList} from '../mutable/ArrayList';


export class ImmutableListImpl<T> implements ImmutableList<T>, Cloneable<ImmutableListImpl<T>> {
    private readonly _items: ArrayList<T>;

    public get firstIndex(): number {
        return this._items.firstIndex;
    }

    public get isEmpty(): boolean {
        return this._items.isEmpty;
    }

    public get lastIndex(): number {
        return this._items.lastIndex;
    }

    public get length(): number {
        return this._items.length;
    }

    public constructor(items?: Sequence<T>) {
        this._items = new ArrayList(items);
    }

    public [Symbol.iterator](): Iterator<T> {
        return this._items[Symbol.iterator]();
    }

    public add(item: T): ImmutableList<T> {
        return undefined;
    }

    public addAll(items: Sequence<T>): ImmutableList<T> {
        return undefined;
    }

    public aggregate<TAggregate>(iterator: (lastSeed: TAggregate, item: T, index: number) => TAggregate, initialSeed: TAggregate): TAggregate {
        return undefined;
    }

    public all(predicate: IteratorFunction<T, boolean>): boolean {
        return false;
    }

    public any(predicate: IteratorFunction<T, boolean>): boolean {
        return false;
    }

    public average(selector: IteratorFunction<T, number>): number {
        return 0;
    }

    public clear(): ImmutableList<T> {
        return undefined;
    }

    public clone(): ImmutableListImpl<T> {
        return undefined;
    }

    public concat(otherList: Sequence<T>): ImmutableList<T> {
        return undefined;
    }

    public contains(item: T): boolean;

    public contains(item: T, comparator: EqualityComparator<T>): boolean;

    public contains(item: T, comparator?: EqualityComparator<T>): boolean {
        return false;
    }

    public containsAll(items: Sequence<T>): boolean;

    public containsAll(items: Sequence<T>, comparator: EqualityComparator<T>): boolean;

    public containsAll(items: Sequence<T>, comparator?: EqualityComparator<T>): boolean {
        return false;
    }

    public count(predicate: IteratorFunction<T, boolean>): number {
        return 0;
    }

    public distinct(): ImmutableList<T>;

    public distinct(comparator: EqualityComparator<T>): ImmutableList<T>;

    public distinct(comparator?: EqualityComparator<T>): ImmutableList<T> {
        return undefined;
    }

    public except(otherList: Sequence<T>): ImmutableList<T>;

    public except(otherList: Sequence<T>, comparator: EqualityComparator<T>): ImmutableList<T>;

    public except(otherList: Sequence<T>, comparator?: EqualityComparator<T>): ImmutableList<T> {
        return undefined;
    }

    public findAll(predicate: IteratorFunction<T, boolean>): ImmutableList<T> {
        return undefined;
    }

    public first(predicate: IteratorFunction<T, boolean>): T | undefined;

    public first(predicate: IteratorFunction<T, boolean>, defaultValue: T): T;

    public first(predicate: IteratorFunction<T, boolean>, defaultValue?: T): any {
    }

    public firstOrDefault(defaultValue: T): T {
        return undefined;
    }

    public forEach(iterator: IteratorFunction<T, boolean | void>): void;

    public forEach(iterator: IteratorFunction<T, boolean | void>, startIndex: number): void;

    public forEach(iterator: IteratorFunction<T, boolean | void>, startIndex: number, count: number): void;

    public forEach(iterator: IteratorFunction<T, boolean | void>, startIndex?: number, count?: number): void {
    }

    public forEachReversed(iterator: IteratorFunction<T, boolean | void>): void;

    public forEachReversed(iterator: IteratorFunction<T, boolean | void>, startIndex: number): void;

    public forEachReversed(iterator: IteratorFunction<T, boolean | void>, startIndex: number, count: number): void;

    public forEachReversed(iterator: IteratorFunction<T, boolean | void>, startIndex?: number, count?: number): void {
    }

    public getAt(index: number): T {
        return undefined;
    }

    public groupBy<TKey>(keySelector: IteratorFunction<T, TKey>): ImmutableList<Grouping<TKey, T>>;

    public groupBy<TKey>(keySelector: IteratorFunction<T, TKey>, keyComparator: EqualityComparator<TKey>): ImmutableList<Grouping<TKey, T>>;

    public groupBy(keySelector, keyComparator?): ImmutableList<Grouping<TKey, T>> {
        return undefined;
    }

    public indexOf(item: T): number;

    public indexOf(item: T, comparator: EqualityComparator<T>): number;

    public indexOf(item: T, startIndex: number): number;

    public indexOf(item: T, startIndex: number, comparator: EqualityComparator<T>): number;

    public indexOf(item: T, startIndex: number, count: number): number;

    public indexOf(item: T, startIndex: number, count: number, comparator: EqualityComparator<T>): number;

    public indexOf(item: T, comparator?: EqualityComparator<T> | number, comparator?: EqualityComparator<T> | number, comparator?: EqualityComparator<T>): number {
        return 0;
    }

    public intersect(otherList: Sequence<T>): ImmutableList<T>;

    public intersect(otherList: Sequence<T>, comparator: EqualityComparator<T>): ImmutableList<T>;

    public intersect(otherList: Sequence<T>, comparator?: EqualityComparator<T>): ImmutableList<T> {
        return undefined;
    }

    public join<TOuter, TKey, TResult>(outerList: Sequence<TOuter>, outerKeySelector: IteratorFunction<TOuter, TKey>, innerKeySelector: IteratorFunction<T, TKey>, resultSelector: CombineFunction<T, TOuter, TResult>): ImmutableList<TResult>;

    public join<TOuter, TKey, TResult>(outerList: Sequence<TOuter>, outerKeySelector: IteratorFunction<TOuter, TKey>, innerKeySelector: IteratorFunction<T, TKey>, resultSelector: CombineFunction<T, TOuter, TResult>, keyComparator: EqualityComparator<TKey>): ImmutableList<TResult>;

    public join(outerList, outerKeySelector, innerKeySelector, resultSelector, keyComparator?): ImmutableList<TResult> {
        return undefined;
    }

    public last(predicate: IteratorFunction<T, boolean>): T | undefined;

    public last(predicate: IteratorFunction<T, boolean>, defaultValue: T): T;

    public last(predicate: IteratorFunction<T, boolean>, defaultValue?: T): any {
    }

    public lastIndexOf(item: T): number;

    public lastIndexOf(item: T, comparator: EqualityComparator<T>): number;

    public lastIndexOf(item: T, startIndex: number): number;

    public lastIndexOf(item: T, startIndex: number, comparator: EqualityComparator<T>): number;

    public lastIndexOf(item: T, startIndex: number, count: number): number;

    public lastIndexOf(item: T, startIndex: number, count: number, comparator: EqualityComparator<T>): number;

    public lastIndexOf(item: T, comparator?: EqualityComparator<T> | number, comparator?: EqualityComparator<T> | number, comparator?: EqualityComparator<T>): number {
        return 0;
    }

    public lastOrDefault(defaultValue: T): T {
        return undefined;
    }

    public map<TResult>(selector: IteratorFunction<T, TResult>): ImmutableList<TResult> {
        return undefined;
    }

    public max(selector: IteratorFunction<T, number>): number {
        return 0;
    }

    public min(selector: IteratorFunction<T, number>): number {
        return 0;
    }

    public orderBy<TKey>(keySelector: (actualItem: T) => TKey, comparator: Comparator<TKey>, sortOrder: SortOrder): ImmutableList<T> {
        return undefined;
    }

    public remove(item: T): ImmutableList<T>;

    public remove(item: T, comparator: EqualityComparator<T>): ImmutableList<T>;

    public remove(item: T, comparator?: EqualityComparator<T>): ImmutableList<T> {
        return undefined;
    }

    public removeAll(items: Sequence<T>): ImmutableList<T>;

    public removeAll(items: Sequence<T>, comparator: EqualityComparator<T>): ImmutableList<T>;

    public removeAll(items: Sequence<T>, comparator?: EqualityComparator<T>): ImmutableList<T> {
        return undefined;
    }

    public removeBy(predicate: IteratorFunction<T, boolean>): ImmutableList<T> {
        return undefined;
    }

    public retainAll(items: Sequence<T>): ImmutableList<T>;

    public retainAll(items: Sequence<T>, comparator: EqualityComparator<T>): ImmutableList<T>;

    public retainAll(items: Sequence<T>, comparator?: EqualityComparator<T>): ImmutableList<T> {
        return undefined;
    }

    public reverse(): ImmutableList<T> {
        return undefined;
    }

    public selectMany<TInnerItem, TResult>(collectionSelector: IteratorFunction<T, Sequence<TInnerItem>>, resultSelector: CombineFunction<T, TInnerItem, TResult>): ImmutableList<TResult> {
        return undefined;
    }

    public skip(offset: number): ImmutableList<T> {
        return undefined;
    }

    public skipWhile(condition: IteratorFunction<T, boolean>): ImmutableList<T> {
        return undefined;
    }

    public slice(offset: number): ImmutableList<T>;

    public slice(offset: number, length: number): ImmutableList<T>;

    public slice(offset: number, length?: number): ImmutableList<T> {
        return undefined;
    }

    public take(length: number): ImmutableList<T> {
        return undefined;
    }

    public takeWhile(condition: IteratorFunction<T, boolean>): ImmutableList<T> {
        return undefined;
    }

    public toArray(): T[] {
        return [];
    }

    public union(otherList: Sequence<T>): ImmutableList<T>;

    public union(otherList: Sequence<T>, comparator: EqualityComparator<T>): ImmutableList<T>;

    public union(otherList: Sequence<T>, comparator?: EqualityComparator<T>): ImmutableList<T> {
        return undefined;
    }

    public zip<TOther, TResult>(otherList: Sequence<TOther>, resultSelector: CombineFunction<T, TOther, TResult>): ImmutableList<TResult> {
        return undefined;
    }

}
