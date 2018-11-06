import {ReadOnlyList} from '../readonly/ReadOnlyList';
import {Event} from '../../../events/Event';
import {ListChangedEventArgs} from './ListChangedEventArgs';
import {Cloneable} from '../../../base/Cloneable';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface ObservableList<T> extends ReadOnlyList<T>, Cloneable<ObservableList<T>> {
    readonly changed: Event<ListChangedEventArgs<T>>;

    clone(): ObservableList<T>;
}
