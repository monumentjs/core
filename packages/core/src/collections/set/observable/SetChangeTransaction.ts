import {SetChange} from './SetChange';
import {ObservableSet} from './ObservableSet';
import {SetChangeKind} from './SetChangeKind';
import {EventDispatcher} from '../../../events/EventDispatcher';
import {SetChangedEventArgs} from './SetChangedEventArgs';


/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class SetChangeTransaction<T> {
    private readonly _set: ObservableSet<T>;
    private readonly _event: EventDispatcher<SetChangedEventArgs<T>>;
    private _changes: Array<SetChange<T>> = [];

    public constructor(set: ObservableSet<T>, event: EventDispatcher<SetChangedEventArgs<T>>) {
        this._set = set;
        this._event = event;
    }

    public close() {
        if (this._changes.length > 0) {
            this._event.trigger(new SetChangedEventArgs(this._set, this._changes));
            this._changes = [];
        }
    }

    public onItemAdded(item: T) {
        this._changes.push({
            type: SetChangeKind.ITEM_ADDED,
            item
        });
    }

    public onItemRemoved(item: T) {
        this._changes.push({
            type: SetChangeKind.ITEM_REMOVED,
            item
        });
    }

    public onListCleared(itemsRemoved: number) {
        this._changes.push({
            type: SetChangeKind.SET_CLEARED,
            itemsRemoved
        });
    }
}
