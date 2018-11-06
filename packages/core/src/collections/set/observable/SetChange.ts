import {ItemAddedSetChange} from './ItemAddedSetChange';
import {ItemRemovedSetChange} from './ItemRemovedSetChange';
import {SetClearedSetChange} from './SetClearedSetChange';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export type SetChange<T> =
    ItemAddedSetChange<T> |
    ItemRemovedSetChange<T> |
    SetClearedSetChange;
