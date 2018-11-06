import {SetChangeKind} from './SetChangeKind';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface ItemRemovedSetChange<T> {
    readonly type: SetChangeKind.ITEM_REMOVED;
    readonly item: T;
}
