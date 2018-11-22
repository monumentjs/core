import {ReadOnlySet} from '../readonly/ReadOnlySet';
import {EventSource} from '../../../events/EventSource';
import {SetChangedEventArgs} from './SetChangedEventArgs';
import {Cloneable} from '../../../base/Cloneable';


/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface ObservableSet<T> extends ReadOnlySet<T>, Cloneable<ObservableSet<T>> {
    readonly changed: EventSource<SetChangedEventArgs<T>>;

    clone(): ObservableSet<T>;
}
