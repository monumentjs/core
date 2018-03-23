import {StrictEqualityComparator} from '@monument/core/main/StrictEqualityComparator';
import {EqualityComparator} from '@monument/core/main/EqualityComparator';
import {IteratorFunction} from '@monument/collections-core/main/IteratorFunction';
import {List} from '@monument/collections-core/main/List';
import {ArrayList} from './ArrayList';
import {AbstractSet} from './AbstractSet';


export class ListSet<T> extends AbstractSet<T> {
    private _items: List<T>;


    // Countable interface implementation


    public get length(): number {
        return this._items.length;
    }


    public constructor(items?: Iterable<T>, comparator: EqualityComparator<T> = StrictEqualityComparator.instance) {
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


    public getIterator(): Iterator<T> {
        return this._items.getIterator();
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
