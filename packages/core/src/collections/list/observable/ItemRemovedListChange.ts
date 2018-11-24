import {ListChangeType} from './ListChangeType';
import {ListChange} from './ListChange';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class ItemRemovedListChange<T> implements ListChange {
    public readonly type: ListChangeType.ITEM_REMOVED = ListChangeType.ITEM_REMOVED;
    public readonly index: number;
    public readonly item: T;

    public constructor(index: number, item: T) {
        this.index = index;
        this.item = item;
    }
}
