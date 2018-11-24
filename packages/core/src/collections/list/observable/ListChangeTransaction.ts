import {ListChanges} from './ListChanges';
import {ObservableList} from './ObservableList';
import {EventDispatcher} from '../../../events/EventDispatcher';
import {ListChangedEventArgs} from './ListChangedEventArgs';
import {ItemAddedListChange} from './ItemAddedListChange';
import {ItemInsertedListChange} from './ItemInsertedListChange';
import {ItemRemovedListChange} from './ItemRemovedListChange';
import {ItemReplacedListChange} from './ItemReplacedListChange';
import {ListClearedListChange} from './ListClearedListChange';


/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class ListChangeTransaction<T> {
    private readonly _list: ObservableList<T>;
    private readonly _event: EventDispatcher<ListChangedEventArgs<T>>;
    private _changes: Array<ListChanges<T>> = [];

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

    public onItemAdded(index: number, item: T): void {
        this._changes.push(new ItemAddedListChange(index, item));
    }

    public onItemInserted(index: number, item: T) {
        this._changes.push(new ItemInsertedListChange(index, item));
    }

    public onItemRemoved(index: number, item: T) {
        this._changes.push(new ItemRemovedListChange(index, item));
    }

    public onItemReplaced(index: number, oldValue: T, newValue: T) {
        this._changes.push(new ItemReplacedListChange(index, oldValue, newValue));
    }

    public onListCleared(itemsRemoved: number) {
        this._changes.push(new ListClearedListChange(itemsRemoved));
    }
}
