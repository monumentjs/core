import {OrderedList} from './OrderedList';
import {Ordered} from '../../../comparison/order/Ordered';
import {SortOrder} from '../../../comparison/order/SortOrder';
import {Sequence} from '../../base/Sequence';
import {PriorityComparator} from '../../../comparison/order/PriorityComparator';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class PrioritizedList<T extends Ordered> extends OrderedList<T> {

    public constructor();
    public constructor(sortOrder: SortOrder);
    public constructor(sortOrder: SortOrder, items: Sequence<T>);
    public constructor(sortOrder: SortOrder = SortOrder.ASCENDING, items?: Sequence<T>) {
        if (items) {
            super(PriorityComparator.get(), sortOrder, items);
        } else {
            super(PriorityComparator.get(), sortOrder);
        }
    }

    public clone(): PrioritizedList<T> {
        return new PrioritizedList(this.sortOrder, this._items);
    }
}
