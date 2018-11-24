import {ListChangeType} from './ListChangeType';
import {ListChange} from './ListChange';


/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class ItemInsertedListChange<T> implements ListChange {
    public readonly type: ListChangeType.ITEM_INSERTED = ListChangeType.ITEM_INSERTED;
    public readonly index: number;
    public readonly item: T;

    public constructor(index: number, item: T) {
        this.index = index;
        this.item = item;
    }
}
