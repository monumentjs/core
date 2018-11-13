import {EventArgs} from '../../../events/EventArgs';
import {ListChange} from './ListChange';
import {ObservableList} from './ObservableList';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class ListChangedEventArgs<T> extends EventArgs<ObservableList<T>> {
    public readonly changes: Array<ListChange<T>>;

    public constructor(target: ObservableList<T>, changes: Array<ListChange<T>>) {
        super(target);
        this.changes = changes;
    }
}
