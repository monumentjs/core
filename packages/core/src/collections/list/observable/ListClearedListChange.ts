import {ListChangeKind} from './ListChangeKind';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface ListClearedListChange {
    readonly type: ListChangeKind.LIST_CLEARED;
    readonly itemsRemoved: number;
}
