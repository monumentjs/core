import {ListChangeKind} from './ListChangeKind';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface ItemRemovedListChange<T> {
    readonly type: ListChangeKind.ITEM_REMOVED;
    readonly item: T;
    readonly index: number;
}
