import {EventArgs} from '../../../events/EventArgs';
import {ListChanges} from './ListChanges';
import {ObservableList} from './ObservableList';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class ListChangedEventArgs<T> extends EventArgs<ObservableList<T>> {
    public readonly changes: Array<ListChanges<T>>;

    public constructor(target: ObservableList<T>, changes: Array<ListChanges<T>>) {
        super(target);
        this.changes = changes;
    }
}
