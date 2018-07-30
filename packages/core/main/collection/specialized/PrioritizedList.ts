import {OrderedList} from './OrderedList';
import {Ordered} from '../../Ordered';
import {SortOrder} from '../SortOrder';
import {Sequence} from '../readonly/Sequence';
import {PriorityComparator} from '../../utils/comparison/PriorityComparator';


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
}
