import {EventArgs} from '../../../events/EventArgs';
import {SetChange} from './SetChange';
import {ObservableSet} from './ObservableSet';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class SetChangedEventArgs<T> extends EventArgs<ObservableSet<T>> {
    public readonly changes: ReadonlyArray<SetChange<T>>;

    public constructor(target: ObservableSet<T>, changes: ReadonlyArray<SetChange<T>>) {
        super(target);
        this.changes = changes;
    }
}
