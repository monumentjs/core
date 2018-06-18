import {EqualityComparator} from '../EqualityComparator';
import {IteratorFunction} from './IteratorFunction';
import {List} from './List';
import {ArrayList} from './ArrayList';
import {AbstractSet} from './AbstractSet';


export class ListSet<T> extends AbstractSet<T> {
    private _items: List<T>;


    // Countable interface implementation


    public get length(): number {
        return this._items.length;
    }


    public constructor(items?: Iterable<T>, comparator?: EqualityComparator<T>) {
        super(undefined, comparator);

        this._items = new ArrayList();

        if (items != null) {
            this.addAll(items);
        }
    }


    // Cloneable interface implementation


    public clone(): ListSet<T> {
        return new ListSet(this, this.comparator);
    }


    // Enumerable interface implementation


    public get iterator(): Iterator<T> {
        return this._items.iterator;
    }


    public forEach(iterator: IteratorFunction<T, boolean | void>): void {
        this._items.forEach(iterator);
    }


    public forEachReversed(iterator: IteratorFunction<T, boolean | void>): void {
        this._items.forEachReversed(iterator);
    }


    // Collection interface implementation


    public add(item: T): boolean {
        if (this.contains(item)) {
            return false;
        }

        this._items.add(item);

        return true;
    }


    public remove(otherItem: T): boolean {
        return this._items.remove(otherItem, this.comparator);
    }


    public removeBy(predicate: IteratorFunction<T, boolean>): boolean {
        return this._items.removeBy(predicate);
    }


    public removeAll(items: Iterable<T>): boolean {
        return this._items.removeAll(items, this.comparator);
    }


    public clear(): boolean {
        return this._items.clear();
    }
}
