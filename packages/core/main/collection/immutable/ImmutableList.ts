import {EqualityComparator} from '../../EqualityComparator';
import {IteratorFunction} from '../IteratorFunction';
import {ImmutableCollection} from './ImmutableCollection';
import {ReadOnlyList} from '../ReadOnlyList';
import {AbstractReadOnlyCollection} from '../AbstractReadOnlyCollection';
import {Grouping} from '../Grouping';
import {CombineFunction} from '../CombineFunction';
import {SortOrder} from '../SortOrder';
import {Comparator} from '../../Comparator';
import {Sequence} from '../Sequence';
import {ArrayList} from '../ArrayList';
import {List} from '../List';


export class ImmutableList<T> extends AbstractReadOnlyCollection<T> implements ImmutableCollection<T>, ReadOnlyList<T> {

    private readonly _items: ArrayList<T>;


    public get iterator(): Iterator<T> {
        return this._items.iterator;
    }


    public get length(): number {
        return this._items.length;
    }


    public constructor(items?: Sequence<T>) {
        super();

        this._items = new ArrayList(items);
    }


    public add(item: T): ImmutableList<T> {
        const list: ArrayList<T> = this._items.clone();

        if (list.add(item)) {
            return new ImmutableList(list);
        }

        return this;
    }


    public addAll(items: Sequence<T>): ImmutableList<T> {
        const list: ArrayList<T> = this._items.clone();

        if (list.addAll(items)) {
            return new ImmutableList(list);
        }

        return this;
    }


    public remove(item: T, comparator?: EqualityComparator<T>): ImmutableList<T> {
        const list: ArrayList<T> = this._items.clone();

        if (list.remove(item, comparator)) {
            return new ImmutableList(list);
        }

        return this;
    }


    public removeAll(items: Sequence<T>, comparator?: EqualityComparator<T>): ImmutableList<T> {
        const list: ArrayList<T> = this._items.clone();

        if (list.removeAll(items, comparator)) {
            return new ImmutableList(list);
        }

        return this;
    }


    public removeBy(predicate: IteratorFunction<T, boolean>): ImmutableList<T> {
        const list: ArrayList<T> = this._items.clone();

        if (list.removeBy(predicate)) {
            return new ImmutableList(list);
        }

        return this;
    }


    // List

    public retainAll(items: Sequence<T>, comparator?: EqualityComparator<T>): ImmutableList<T> {
        const list: ArrayList<T> = this._items.clone();

        if (list.retainAll(items, comparator)) {
            return new ImmutableList(list);
        }

        return this;
    }


    public clear(): ImmutableList<T> {
        if (this.isEmpty) {
            return this;
        }

        return new ImmutableList();
    }


    public setAt(index: number, newValue: T): ImmutableList<T> {
        const list: ArrayList<T> = this._items.clone();

        list.setAt(index, newValue);

        return new ImmutableList(list);
    }


    public insert(index: number, item: T): ImmutableList<T> {
        const list: ArrayList<T> = this._items.clone();

        if (list.insert(index, item)) {
            return new ImmutableList(list);
        }

        return this;
    }


    public insertAll(index: number, items: Sequence<T>): ImmutableList<T> {
        const list: ArrayList<T> = this._items.clone();

        if (list.insertAll(index, items)) {
            return new ImmutableList(list);
        }

        return this;
    }


    public removeAt(index: number): ImmutableList<T> {
        const list: ArrayList<T> = this._items.clone();

        list.removeAt(index);

        return new ImmutableList(list);
    }


    public aggregate<TAggregate>(
        iterator: (lastSeed: TAggregate, item: T, index: number) => TAggregate,
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


    public clone(): ImmutableList<T> {
        return new ImmutableList(this._items);
    }


    public concat(otherList: Sequence<T>): ImmutableList<T> {
        if (otherList.length === ZERO) {
            return this;
        }

        return new ImmutableList(this._items.concat(otherList));
    }


    public count(predicate: IteratorFunction<T, boolean>): number {
        return this._items.count(predicate);
    }


    public distinct(comparator?: EqualityComparator<T>): ImmutableList<T> {
        const list: List<T> = this._items.distinct(comparator);

        if (list.length !== this.length) {
            return new ImmutableList(list);
        }

        return this;
    }


    public except(otherList: Sequence<T>, comparator?: EqualityComparator<T>): ImmutableList<T> {
        const list: List<T> = this._items.except(otherList, comparator);

        if (list.length !== this.length) {
            return new ImmutableList(list);
        }

        return this;
    }


    public first(predicate: IteratorFunction<T, boolean>, defaultValue?: T): T | undefined {
        return this._items.first(predicate, defaultValue);
    }


    public firstOrDefault(defaultValue: T): T {
        return this._items.firstOrDefault(defaultValue);
    }


    public forEach(
        iterator: IteratorFunction<T, boolean | void>,
        startIndex?: number,
        count?: number
    ): void {
        this._items.forEach(iterator, startIndex, count);
    }


    public forEachReversed(
        iterator: IteratorFunction<T, boolean | void>,
        startIndex?: number,
        count?: number
    ): void {
        this._items.forEachReversed(iterator, startIndex, count);
    }


    public getAt(index: number): T {
        return this._items.getAt(index);
    }


    public groupBy<TKey>(
        keySelector: IteratorFunction<T, TKey>,
        keyComparator?: EqualityComparator<TKey>
    ): ImmutableList<Grouping<TKey, T>> {
        const groups: List<Grouping<TKey, T>> = this._items.groupBy(keySelector, keyComparator);

        return new ImmutableList(groups);
    }


    public indexOf(
        searchItem: T,
        startIndex?: number,
        count?: number,
        comparator?: EqualityComparator<T>
    ): number {
        return this._items.indexOf(searchItem, startIndex, count, comparator);
    }


    public intersect(
        otherList: Sequence<T>,
        comparator?: EqualityComparator<T>
    ): ImmutableList<T> {
        const intersection: List<T> = this._items.intersect(otherList, comparator);

        if (intersection.length !== this.length + otherList.length) {
            return new ImmutableList(intersection);
        }

        return this;
    }


    public join<TOuter, TKey, TResult>(
        outerList: Sequence<TOuter>,
        outerKeySelector: IteratorFunction<TOuter, TKey>,
        innerKeySelector: IteratorFunction<T, TKey>,
        resultSelector: CombineFunction<T, TOuter, TResult>,
        keyComparator?: EqualityComparator<TKey>
    ): ImmutableList<TResult> {
        return new ImmutableList(this._items.join(
            outerList,
            outerKeySelector,
            innerKeySelector,
            resultSelector,
            keyComparator
        ));
    }


    public last(predicate: IteratorFunction<T, boolean>, defaultValue?: T): T | undefined {
        return this._items.last(predicate, defaultValue);
    }


    public lastIndexOf(item: T, startIndex?: number, count?: number, comparator?: EqualityComparator<T>): number {
        return this._items.lastIndexOf(item, startIndex, count, comparator);
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


    public orderBy<TKey>(keySelector: (actualItem: T) => TKey, comparator: Comparator<TKey>, sortOrder: SortOrder): ImmutableList<T> {
        // TODO: detect items replaced
        return new ImmutableList(this._items.orderBy(keySelector, comparator, sortOrder));
    }


    public reverse(): ImmutableList<T> {
        return new ImmutableList(this._items.reverse());
    }


    public map<TResult>(selector: IteratorFunction<T, TResult>): ImmutableList<TResult> {
        return new ImmutableList(this._items.map(selector));
    }


    public selectMany<TInnerItem, TResult>(
        collectionSelector: IteratorFunction<T, List<TInnerItem>>,
        resultSelector: CombineFunction<T, TInnerItem, TResult>
    ): ImmutableList<TResult> {
        return new ImmutableList(
            this._items.selectMany(collectionSelector, resultSelector)
        );
    }


    public skip(offset: number): ImmutableList<T> {
        const list: List<T> = this._items.skip(offset);

        if (list.length !== this.length) {
            return new ImmutableList(list);
        }

        return this;
    }


    public skipWhile(condition: IteratorFunction<T, boolean>): ImmutableList<T> {
        const list: List<T> = this._items.skipWhile(condition);

        if (list.length !== this.length) {
            return new ImmutableList(list);
        }

        return this;
    }


    public slice(offset: number, length: number): ImmutableList<T> {
        if (length === ZERO) {
            return this;
        }

        return new ImmutableList(this._items.slice(offset, length));
    }


    public take(length: number): ImmutableList<T> {
        const list: List<T> = this._items.take(length);

        if (list.length !== this.length) {
            return new ImmutableList(list);
        }

        return this;
    }


    public takeWhile(condition: IteratorFunction<T, boolean>): ImmutableList<T> {
        const list: List<T> = this._items.takeWhile(condition);

        if (list.length !== this.length) {
            return new ImmutableList(list);
        }

        return this;
    }


    public union(otherList: Sequence<T>, comparator?: EqualityComparator<T>): ImmutableList<T> {
        return new ImmutableList(this._items.union(otherList, comparator));
    }


    public findAll(predicate: IteratorFunction<T, boolean>): ImmutableList<T> {
        return new ImmutableList(this._items.findAll(predicate));
    }


    public zip<TOther, TResult>(otherList: ReadOnlyList<TOther>, resultSelector: CombineFunction<T, TOther, TResult>): ImmutableList<TResult> {
        return new ImmutableList(this._items.zip(otherList, resultSelector));
    }
}
