import {SetChangeKind} from './SetChangeKind';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface ItemAddedSetChange<T> {
    readonly type: SetChangeKind.ITEM_ADDED;
    readonly item: T;
}
