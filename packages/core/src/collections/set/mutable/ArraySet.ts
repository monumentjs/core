import {IteratorFunction} from '../../base/IteratorFunction';
import {Sequence} from '../../base/Sequence';
import {Cloneable} from '../../../base/Cloneable';
import {EqualityComparator} from '../../../comparison/equality/EqualityComparator';
import {StrictEqualityComparator} from '../../../comparison/equality/StrictEqualityComparator';
import {AbstractSet} from './AbstractSet';
import {LinkedList} from '../../list/mutable/LinkedList';


/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class ArraySet<T> extends AbstractSet<T> implements Cloneable<ArraySet<T>> {
    private readonly _items: LinkedList<T>;

    public constructor(items?: Sequence<T>, comparator: EqualityComparator<T> = StrictEqualityComparator.get()) {
        super(comparator);
        this._items = new LinkedList();

        if (items != null) {
            this.addAll(items);
        }
    }

    public clone(): ArraySet<T> {
        return new ArraySet(this, this.comparator);
    }

    public remove(otherItem: T): boolean {
        return this._items.remove(otherItem, this.comparator);
    }

    public removeAll(items: Sequence<T>): boolean {
        return this._items.removeAll(items, this.comparator);
    }

    public removeBy(predicate: IteratorFunction<T, boolean>): boolean {
        return this._items.removeBy(predicate);
    }

    public retainAll(items: Sequence<T>): boolean {
        return this._items.retainAll(items, this.comparator);
    }

    protected doAdd(item: T): void {
        this._items.addIfAbsent(item, this.comparator);
    }

    protected doAddAll(items: Sequence<T>): void {
        for (const item of items) {
            this._items.addIfAbsent(item, this.comparator);
        }
    }

    protected doClear(): void {
        this._items.clear();
    }
}
