import {ListChangeKind} from './ListChangeKind';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface ItemReplacedListChange<T> {
    readonly type: ListChangeKind.ITEM_REPLACED;
    readonly oldValue: T;
    readonly newValue: T;
    readonly index: number;
}
