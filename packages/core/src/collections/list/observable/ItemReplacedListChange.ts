import {ListChangeType} from './ListChangeType';
import {ListChange} from './ListChange';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class ItemReplacedListChange<T> implements ListChange {
    public readonly type: ListChangeType.ITEM_REPLACED = ListChangeType.ITEM_REPLACED;
    public readonly oldValue: T;
    public readonly newValue: T;
    public readonly index: number;

    public constructor(index: number, oldValue: T, newValue: T) {
        this.oldValue = oldValue;
        this.newValue = newValue;
        this.index = index;
    }
}
