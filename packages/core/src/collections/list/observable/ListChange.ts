import {ItemAddedListChange} from './ItemAddedListChange';
import {ItemRemovedListChange} from './ItemRemovedListChange';
import {ItemReplacedListChange} from './ItemReplacedListChange';
import {ListClearedListChange} from './ListClearedListChange';
import {ItemInsertedListChange} from './ItemInsertedListChange';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export type ListChange<T> =
    ItemAddedListChange<T> |
    ItemInsertedListChange<T> |
    ItemRemovedListChange<T> |
    ItemReplacedListChange<T> |
    ListClearedListChange;
