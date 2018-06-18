import {IteratorFunction} from '../collections/IteratorFunction';
import {List} from '../collections/List';
import {CombineFunction} from '../collections/CombineFunction';
import {SortOrder} from '../collections/SortOrder';
import {Grouping} from '../collections/Grouping';
import {CollectionChangedEventArgs} from './CollectionChangedEventArgs';
import {ObservableCollection} from './ObservableCollection';
import {ConfigurableEvent} from '../events/ConfigurableEvent';
import {EqualityComparator} from '../EqualityComparator';
import {Comparator} from '../Comparator';


export abstract class AbstractObservableList<T> implements List<T>, ObservableCollection<T> {
    private readonly _items: List<T>;

    public readonly collectionChanged: ConfigurableEvent<this, CollectionChangedEventArgs> = new ConfigurableEvent();


    public get isEmpty(): boolean {
        return this._items.isEmpty;
    }


    public get length(): number {
        return this._items.length;
    }


    public get iterator(): Iterator<T> {
        return this._items.iterator;
    }


    public constructor(items: List<T>) {
        this._items = items;
    }


    public getAt(index: number): T {
        return this._items.getAt(index);
    }


    public setAt(index: number, newValue: T): T {
        return this._items.setAt(index, newValue);
    }


    public insert(index: number, item: T): boolean {
        return this._items.insert(index, item);
    }


    public insertAll(index: number, items: Iterable<T>): boolean {
        return this._items.insertAll(index, items);
    }


    public removeAt(index: number): T {
        return this._items.removeAt(index);
    }


    public indexOf(item: T): number {
        return this._items.indexOf(item);
    }


    public lastIndexOf(item: T): number {
        return this._items.lastIndexOf(item);
    }


    public slice(offset: number, length: number): List<T> {
        return this._items.slice(offset, length);
    }


    public add(item: T): boolean {
        return this._items.add(item);
    }


    public addAll(items: Iterable<T>): boolean {
        return this._items.addAll(items);
    }


    public contains(item: T, comparator?: EqualityComparator<T>): boolean {
        return this._items.contains(item, comparator);
    }


    public containsAll(items: Iterable<T>, comparator?: EqualityComparator<T>): boolean {
        return this._items.containsAll(items, comparator);
    }


    public remove(item: T, comparator?: EqualityComparator<T>): boolean {
        return this._items.remove(item, comparator);
    }


    public removeAll(items: Iterable<T>, comparator?: EqualityComparator<T>): boolean {
        return this._items.removeAll(items, comparator);
    }


    public removeBy(predicate: IteratorFunction<T, boolean>): boolean {
        return this._items.removeBy(predicate);
    }


    public retainAll(items: Iterable<T>, comparator?: EqualityComparator<T>): boolean {
        return this._items.retainAll(items, comparator);
    }


    public clear(): boolean {
        return this._items.clear();
    }


    public toArray(): T[] {
        return this._items.toArray();
    }


    public forEach(iterator: IteratorFunction<T, void>): void {
        this._items.forEach(iterator);
    }


    public forEachReversed(iterator: IteratorFunction<T, void>): void {
        this._items.forEachReversed(iterator);
    }


    public [Symbol.iterator](): Iterator<T> {
        return this._items[Symbol.iterator]();
    }


    public aggregate<TAggregate>(
        iterator: (lastSeed: (TAggregate), item: T, index: number) => TAggregate,
        initialSeed: TAggregate
    ): TAggregate {
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


    public concat(otherList: List<T>): List<T> {
        return this._items.concat(otherList);
    }


    public count(predicate: IteratorFunction<T, boolean>): number {
        return this._items.count(predicate);
    }


    public distinct(comparator?: EqualityComparator<T>): List<T> {
        return this._items.distinct(comparator);
    }


    public except(otherList: List<T>, comparator?: EqualityComparator<T>): List<T> {
        return this._items.except(otherList, comparator);
    }


    public first(predicate: IteratorFunction<T, boolean>, defaultValue?: T): any | T {
        return this._items.first(predicate, defaultValue);
    }


    public firstOrDefault(defaultValue: T): T {
        return this._items.firstOrDefault(defaultValue);
    }


    public groupBy<TKey>(
        keySelector: IteratorFunction<T, TKey>,
        keyComparer?: EqualityComparator<TKey>
    ): List<Grouping<TKey, T>> {
        return this._items.groupBy(keySelector, keyComparer);
    }


    public intersect(otherList: List<T>, comparator?: EqualityComparator<T>): List<T> {
        return this._items.intersect(otherList, comparator);
    }


    public join<TOuter, TKey, TResult>(
        outerList: List<TOuter>,
        outerKeySelector: IteratorFunction<TOuter, TKey>,
        innerKeySelector: IteratorFunction<T, TKey>,
        resultSelector: CombineFunction<T, TOuter, TResult>,
        keyComparator?: EqualityComparator<TKey>
    ): List<TResult> {
        return this._items.join(outerList, outerKeySelector, innerKeySelector, resultSelector, keyComparator);
    }


    public last(predicate: IteratorFunction<T, boolean>, defaultValue?: T): any | T {
        return this._items.last(predicate, defaultValue);
    }


    public lastOrDefault(defaultValue: T): T {
        return this._items.lastOrDefault(defaultValue);
    }


    public max(selector: (item: T) => number): number {
        return this._items.max(selector);
    }


    public min(selector: (item: T) => number): number {
        return this._items.min(selector);
    }


    public orderBy<TKey>(
        keySelector: (actualItem: T) => TKey,
        comparator: Comparator<TKey>,
        sortOrder: SortOrder
    ): List<T> {
        return this._items.orderBy(keySelector, comparator, sortOrder);
    }


    public reverse(): List<T> {
        return this._items.reverse();
    }


    public select<TResult>(selector: IteratorFunction<T, TResult>): List<TResult> {
        return this._items.select(selector);
    }


    public selectMany<TInnerItem, TResult>(
        collectionSelector: IteratorFunction<T, List<TInnerItem>>,
        resultSelector: CombineFunction<T, TInnerItem, TResult>
    ): List<TResult> {
        return this._items.selectMany(collectionSelector, resultSelector);
    }


    public skip(offset: number): List<T> {
        return this._items.skip(offset);
    }


    public skipWhile(condition: IteratorFunction<T, boolean>): List<T> {
        return this._items.skipWhile(condition);
    }


    public take(length: number): List<T> {
        return this._items.take(this.length);
    }


    public takeWhile(condition: IteratorFunction<T, boolean>): List<T> {
        return this._items.takeWhile(condition);
    }


    public union(otherList: List<T>, comparator?: EqualityComparator<T>): List<T> {
        return this._items.union(otherList, comparator);
    }


    public where(predicate: IteratorFunction<T, boolean>): List<T> {
        return this._items.where(predicate);
    }


    public zip<TOther, TResult>(
        otherList: List<TOther>,
        resultSelector: CombineFunction<T, TOther, TResult>
    ): List<TResult> {
        return this._items.zip(otherList, resultSelector);
    }


    // Disposable

    public dispose(): void {
        this.collectionChanged.dispose();
    }


    protected onCollectionChanged(): void {
        this.collectionChanged.trigger(this, new CollectionChangedEventArgs());
    }
}
