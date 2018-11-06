import {Sequence} from '../../base/Sequence';
import {ListProxy} from '../mutable/proxy/ListProxy';
import {ArrayList} from '../mutable/ArrayList';
import {Comparator} from '../../../comparison/order/Comparator';
import {SortOrder} from '../../../comparison/order/SortOrder';


/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class OrderedList<T> extends ListProxy<T, ArrayList<T>> {
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
            this.onChange();
        }

        this.changed.subscribe(() => {
            this.onChange();
        });
    }

    public clone(): OrderedList<T> {
        return new OrderedList<T>(this.comparator, this.sortOrder, this._items);
    }

    protected onChange(): boolean {
        if (this.isEmpty) {
            return false;
        }

        this._items = new ArrayList(this._items.orderBy((item: T): T => {
            return item;
        }, this.comparator, this.sortOrder));

        return true;
    }
}
