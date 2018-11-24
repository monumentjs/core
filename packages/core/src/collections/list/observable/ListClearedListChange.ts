import {ListChangeType} from './ListChangeType';
import {ListChange} from './ListChange';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class ListClearedListChange implements ListChange {
    public readonly type: ListChangeType.LIST_CLEARED = ListChangeType.LIST_CLEARED;
    public readonly itemsRemoved: number;

    public constructor(itemsRemoved: number) {
        this.itemsRemoved = itemsRemoved;
    }
}
