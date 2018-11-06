import {SetChangeKind} from './SetChangeKind';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface SetClearedSetChange {
    readonly type: SetChangeKind.SET_CLEARED;
    readonly itemsRemoved: number;
}
