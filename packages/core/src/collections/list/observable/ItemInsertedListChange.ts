import {ListChangeKind} from './ListChangeKind';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface ItemInsertedListChange<T> {
    readonly type: ListChangeKind.ITEM_INSERTED;
    readonly item: T;
    readonly index: number;
}
