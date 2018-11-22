import {ListChange} from './ListChange';
import {ObservableList} from './ObservableList';
import {ListChangeKind} from './ListChangeKind';
import {EventDispatcher} from '../../../events/EventDispatcher';
import {ListChangedEventArgs} from './ListChangedEventArgs';


/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class ListChangeTransaction<T> {
    private readonly _list: ObservableList<T>;
    private readonly _event: EventDispatcher<ListChangedEventArgs<T>>;
    private _changes: Array<ListChange<T>> = [];

    public constructor(list: ObservableList<T>, event: EventDispatcher<ListChangedEventArgs<T>>) {
        this._list = list;
        this._event = event;
    }

    public close() {
        if (this._changes.length > 0) {
            this._event.trigger(new ListChangedEventArgs(this._list, this._changes));
            this._changes = [];
        }
    }

    public onItemAdded(index: number, item: T) {
        this._changes.push({
            type: ListChangeKind.ITEM_ADDED,
            index,
            item
        });
    }

    public onItemInserted(index: number, item: T) {
        this._changes.push({
            type: ListChangeKind.ITEM_INSERTED,
            index,
            item
        });
    }

    public onItemRemoved(index: number, item: T) {
        this._changes.push({
            type: ListChangeKind.ITEM_REMOVED,
            index,
            item
        });
    }

    public onItemReplaced(index: number, oldValue: T, newValue: T) {
        this._changes.push({
            type: ListChangeKind.ITEM_REPLACED,
            index,
            oldValue,
            newValue
        });
    }

    public onListCleared(itemsRemoved: number) {
        this._changes.push({
            type: ListChangeKind.LIST_CLEARED,
            itemsRemoved
        });
    }
}
