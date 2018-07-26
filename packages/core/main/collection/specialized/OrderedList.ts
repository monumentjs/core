import {ListProxy} from '../mutable/proxy/ListProxy';
import {Sequence} from '../readonly/Sequence';
import {Comparator} from '../../utils/comparison/Comparator';
import {ArrayList} from '../mutable/ArrayList';
import {SortOrder} from '../SortOrder';
import {EqualityComparator} from '../../EqualityComparator';
import {IteratorFunction} from '../IteratorFunction';
import {List} from '../mutable/List';

/**
 * TODO: optimizations
 */
export class OrderedList<T> extends ListProxy<T, List<T>> {
    private readonly _comparator: Comparator<T>;
    private readonly _sortOrder: SortOrder;

    public get comparator(): Comparator<T> {
        return this._comparator;
    }

    public get sortOrder(): SortOrder {
        return this._sortOrder;
    }

    public constructor(comparator: Comparator<T>);
    public constructor(comparator: Comparator<T>, sortOrder: SortOrder);
    public constructor(comparator: Comparator<T>, sortOrder: SortOrder, items: Sequence<T>);
    public constructor(comparator: Comparator<T>, sortOrder: SortOrder = SortOrder.ASCENDING, items?: Sequence<T>) {
        super(new ArrayList(items));

        this._comparator = comparator;
        this._sortOrder = sortOrder;

        if (items != null) {
            this.reorder();
        }
    }

    public add(item: T): boolean {
        return super.add(item) && this.reorder();
    }

    public addAll(items: Sequence<T>): boolean {
        return super.addAll(items) && this.reorder();
    }

    public insert(index: number, item: T): boolean {
        return super.insert(index, item) && this.reorder();
    }

    public insertAll(index: number, items: Sequence<T>): boolean {
        return super.insertAll(index, items) && this.reorder();
    }

    public remove(item: T, comparator?: EqualityComparator<T>): boolean {
        // @ts-ignore
        return super.remove(item, comparator) && this.reorder();
    }

    public removeAll(items: Sequence<T>, comparator?: EqualityComparator<T>): boolean {
        // @ts-ignore
        return super.removeAll(items, comparator) && this.reorder();
    }

    public removeAt(index: number): T {
        const item: T = super.removeAt(index);

        this.reorder();

        return item;
    }

    public removeBy(predicate: IteratorFunction<T, boolean>): boolean {
        return super.removeBy(predicate) && this.reorder();
    }

    public retainAll(items: Sequence<T>, comparator?: EqualityComparator<T>): boolean {
        // @ts-ignore
        return super.retainAll(items, comparator) && this.reorder();
    }

    public setAt(index: number, newValue: T): T {
        const item: T = super.setAt(index, newValue);

        this.reorder();

        return item;
    }

    private reorder(): boolean {
        if (this.isEmpty) {
            return false;
        }

        // FIXME: add reliable check for equality

        this._items = this._items.orderBy((item: T): T => {
            return item;
        }, this._comparator, this._sortOrder);

        return true;
    }
}
