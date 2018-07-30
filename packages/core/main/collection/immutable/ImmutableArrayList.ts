import {EqualityComparator} from '../../utils/comparison/EqualityComparator';
import {IteratorFunction} from '../IteratorFunction';
import {Grouping} from '../Grouping';
import {CombineFunction} from '../CombineFunction';
import {SortOrder} from '../SortOrder';
import {Comparator} from '../../utils/comparison/Comparator';
import {Sequence} from '../readonly/Sequence';
import {ImmutableList} from './ImmutableList';
import {Cloneable} from '../../Cloneable';
import {ArrayList} from '../mutable/ArrayList';
import {List} from '../mutable/List';
import {ReadOnlyListProxy} from '../readonly/proxy/ReadOnlyListProxy';
import {POSITIVE_ONE} from '../../Constants';


export class ImmutableArrayList<T> extends ReadOnlyListProxy<T, ArrayList<T>> implements ImmutableList<T>, Cloneable<ImmutableArrayList<T>> {

    public constructor(items?: Sequence<T>) {
        super(new ArrayList(items));
    }

    public add(item: T): ImmutableList<T> {
        return new ImmutableArrayList<T>([...this._items, item]);
    }

    public addAll(items: Sequence<T>): ImmutableList<T> {
        if (items.length === 0) {
            return this;
        }

        return new ImmutableArrayList<T>([...this._items, ...items]);
    }

    public clear(): ImmutableList<T> {
        if (this.isEmpty) {
            return this;
        }

        return new ImmutableArrayList();
    }

    public clone(): ImmutableArrayList<T> {
        return new ImmutableArrayList<T>(this);
    }

    public concat(otherList: Sequence<T>): ImmutableList<T> {
        if (otherList.length === 0) {
            return this;
        }

        return new ImmutableArrayList([...this._items, ...otherList]);
    }

    public distinct(): ImmutableList<T>;
    public distinct(comparator: EqualityComparator<T>): ImmutableList<T>;
    public distinct(comparator?: EqualityComparator<T>): ImmutableList<T> {
        let result: List<T>;

        if (comparator != null) {
            result = this._items.distinct(comparator);
        } else {
            result = this._items.distinct();
        }

        if (result.length === this.length) {
            return this;
        }

        return new ImmutableArrayList(result);
    }

    public except(otherList: Sequence<T>): ImmutableList<T>;
    public except(otherList: Sequence<T>, comparator: EqualityComparator<T>): ImmutableList<T>;
    public except(otherList: Sequence<T>, comparator?: EqualityComparator<T>): ImmutableList<T> {
        let result: List<T>;

        if (comparator != null) {
            result = this._items.except(otherList, comparator);
        } else {
            result = this._items.except(otherList);
        }

        if (result.length === this.length) {
            return this;
        }

        return new ImmutableArrayList(result);
    }

    public findAll(predicate: IteratorFunction<T, boolean>): ImmutableList<T> {
        const result: List<T> = this._items.findAll(predicate);

        if (result.length === this.length) {
            return this;
        }

        return new ImmutableArrayList(result);
    }

    public groupBy<TKey>(keySelector: IteratorFunction<T, TKey>): ImmutableList<Grouping<TKey, T>>;
    public groupBy<TKey>(keySelector: IteratorFunction<T, TKey>, keyComparator: EqualityComparator<TKey>): ImmutableList<Grouping<TKey, T>>;
    public groupBy<TKey>(keySelector: IteratorFunction<T, TKey>, keyComparator?: EqualityComparator<TKey>): ImmutableList<Grouping<TKey, T>> {
        // @ts-ignore
        return new ImmutableArrayList(this._items.groupBy(...arguments));
    }

    public intersect(otherList: Sequence<T>): ImmutableList<T>;
    public intersect(otherList: Sequence<T>, comparator: EqualityComparator<T>): ImmutableList<T>;
    public intersect(otherList: Sequence<T>, comparator?: EqualityComparator<T>): ImmutableList<T> {
        // @ts-ignore
        const result: List<T> = this._items.intersect(...arguments);

        if (this.equals(result)) {
            return this;
        }

        return new ImmutableArrayList(result);
    }

    public join<TOuter, TKey, TResult>(outerList: Sequence<TOuter>, outerKeySelector: IteratorFunction<TOuter, TKey>, innerKeySelector: IteratorFunction<T, TKey>, resultSelector: CombineFunction<T, TOuter, TResult>): ImmutableList<TResult>;
    public join<TOuter, TKey, TResult>(outerList: Sequence<TOuter>, outerKeySelector: IteratorFunction<TOuter, TKey>, innerKeySelector: IteratorFunction<T, TKey>, resultSelector: CombineFunction<T, TOuter, TResult>, keyComparator: EqualityComparator<TKey>): ImmutableList<TResult>;
    public join<TOuter, TKey, TResult>(outerList: Sequence<TOuter>, outerKeySelector: IteratorFunction<TOuter, TKey>, innerKeySelector: IteratorFunction<T, TKey>, resultSelector: CombineFunction<T, TOuter, TResult>, keyComparator?: EqualityComparator<TKey>): ImmutableList<TResult> {
        // @ts-ignore
        return new ImmutableArrayList(this._items.join(...arguments));
    }

    public map<TResult>(selector: IteratorFunction<T, TResult>): ImmutableList<TResult> {
        return new ImmutableArrayList(this._items.map(selector));
    }

    public orderBy<TKey>(keySelector: (actualItem: T) => TKey, comparator: Comparator<TKey>): ImmutableList<T>;
    public orderBy<TKey>(keySelector: (actualItem: T) => TKey, comparator: Comparator<TKey>, sortOrder: SortOrder): ImmutableList<T>;
    public orderBy<TKey>(keySelector: (actualItem: T) => TKey, comparator: Comparator<TKey>, sortOrder?: SortOrder): ImmutableList<T> {
        // @ts-ignore
        const result: List<T> = this._items.orderBy(...arguments);

        if (this.equals(result)) {
            return this;
        }

        return new ImmutableArrayList(result);
    }

    public remove(item: T): ImmutableList<T>;
    public remove(item: T, comparator: EqualityComparator<T>): ImmutableList<T>;
    public remove(item: T, comparator?: EqualityComparator<T>): ImmutableList<T> {
        // @ts-ignore
        return this.except([item], comparator);
    }

    public removeAll(items: Sequence<T>): ImmutableList<T>;
    public removeAll(items: Sequence<T>, comparator: EqualityComparator<T>): ImmutableList<T>;
    public removeAll(items: Sequence<T>, comparator?: EqualityComparator<T>): ImmutableList<T> {
        // @ts-ignore
        return this.except(items, comparator);
    }

    public removeBy(predicate: IteratorFunction<T, boolean>): ImmutableList<T> {
        return this.findAll((item: T, index: number): boolean => {
            return !predicate(item, index);
        });
    }

    public retainAll(items: Sequence<T>): ImmutableList<T>;
    public retainAll(items: Sequence<T>, comparator: EqualityComparator<T>): ImmutableList<T>;
    public retainAll(items: Sequence<T>, comparator?: EqualityComparator<T>): ImmutableList<T> {
        const copy: ArrayList<T> = this._items.clone();

        // @ts-ignore
        if (copy.retainAll(...arguments)) {
            return new ImmutableArrayList(copy);
        }

        return this;
    }

    public reverse(): ImmutableList<T> {
        if (this.length > POSITIVE_ONE) {
            return new ImmutableArrayList(this._items.reverse());
        }

        return this;
    }

    public selectMany<TInnerItem, TResult>(collectionSelector: IteratorFunction<T, Sequence<TInnerItem>>, resultSelector: CombineFunction<T, TInnerItem, TResult>): ImmutableList<TResult> {
        return new ImmutableArrayList(this._items.selectMany(collectionSelector, resultSelector));
    }

    public skip(offset: number): ImmutableList<T> {
        const result: List<T> = this._items.skip(offset);

        if (result.length === this.length) {
            return this;
        }

        return new ImmutableArrayList(result);
    }

    public skipWhile(condition: IteratorFunction<T, boolean>): ImmutableList<T> {
        const result: List<T> = this._items.skipWhile(condition);

        if (result.length === this.length) {
            return this;
        }

        return new ImmutableArrayList(result);
    }

    public slice(offset: number): ImmutableList<T>;
    public slice(offset: number, length: number): ImmutableList<T>;
    public slice(offset: number, length?: number): ImmutableList<T> {
        // @ts-ignore
        const result: List<T> = this._items.slice(...arguments);

        if (result.length === this.length) {
            return this;
        }

        return new ImmutableArrayList(result);
    }

    public take(length: number): ImmutableList<T> {
        const result: List<T> = this._items.take(length);

        if (result.length === this.length) {
            return this;
        }

        return new ImmutableArrayList(result);
    }

    public takeWhile(condition: IteratorFunction<T, boolean>): ImmutableList<T> {
        const result: List<T> = this._items.takeWhile(condition);

        if (result.length === this.length) {
            return this;
        }

        return new ImmutableArrayList(result);
    }

    public union(otherList: Sequence<T>): ImmutableList<T>;
    public union(otherList: Sequence<T>, comparator: EqualityComparator<T>): ImmutableList<T>;
    public union(otherList: Sequence<T>, comparator?: EqualityComparator<T>): ImmutableList<T> {
        // @ts-ignore
        const result: List<T> = this._items.union(...arguments);

        if (this.equals(result)) {
            return this;
        }

        return new ImmutableArrayList(result);
    }

    public zip<TOther, TResult>(otherList: Sequence<TOther>, resultSelector: CombineFunction<T, TOther, TResult>): ImmutableList<TResult> {
        return new ImmutableArrayList(this._items.zip(otherList, resultSelector));
    }
}
