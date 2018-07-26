import {EqualityComparator} from '../../EqualityComparator';
import {IteratorFunction} from '../IteratorFunction';
import {List} from './List';
import {ArrayList} from './ArrayList';
import {AbstractSet} from './AbstractSet';
import {Sequence} from '../readonly/Sequence';
import {StrictEqualityComparator} from '../../utils/comparison/StrictEqualityComparator';


export class ListSet<T> extends AbstractSet<T> {
    private readonly _items: List<T>;

    public get length(): number {
        return this._items.length;
    }

    public constructor(items?: Sequence<T>, comparator: EqualityComparator<T> = new StrictEqualityComparator()) {
        super(undefined, comparator);

        this._items = new ArrayList();

        if (items != null) {
            this.addAll(items);
        }
    }

    public [Symbol.iterator](): Iterator<T> {
        return this._items[Symbol.iterator]();
    }

    public add(item: T): boolean {
        if (this.contains(item)) {
            return false;
        }

        this._items.add(item);

        return true;
    }

    public clear(): boolean {
        return this._items.clear();
    }

    public clone(): ListSet<T> {
        return new ListSet(this, this.comparator);
    }

    public forEach(iterator: IteratorFunction<T, boolean | void>): void;

    public forEach(iterator: IteratorFunction<T, boolean | void>, startIndex: number): void;

    public forEach(iterator: IteratorFunction<T, boolean | void>, startIndex: number, count: number): void;

    public forEach(iterator: IteratorFunction<T, boolean | void>): void {
        this._items.forEach(iterator);
    }

    public forEachReversed(iterator: IteratorFunction<T, boolean | void>): void;

    public forEachReversed(iterator: IteratorFunction<T, boolean | void>, startIndex: number): void;

    public forEachReversed(iterator: IteratorFunction<T, boolean | void>, startIndex: number, count: number): void;

    public forEachReversed(iterator: IteratorFunction<T, boolean | void>): void {
        this._items.forEachReversed(iterator);
    }

    public remove(otherItem: T): boolean {
        if (this.comparator != null) {
            return this._items.remove(otherItem, this.comparator);
        } else {
            return this._items.remove(otherItem);
        }
    }

    public removeAll(items: Sequence<T>): boolean {
        if (this.comparator != null) {
            return this._items.removeAll(items, this.comparator);
        } else {
            return this._items.removeAll(items);
        }
    }

    public removeBy(predicate: IteratorFunction<T, boolean>): boolean {
        return this._items.removeBy(predicate);
    }
}
