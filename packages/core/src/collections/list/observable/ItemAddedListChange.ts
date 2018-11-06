import {ListChangeKind} from './ListChangeKind';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface ItemAddedListChange<T> {
    readonly type: ListChangeKind.ITEM_ADDED;
    readonly item: T;
    readonly index: number;
}
