import {ReadOnlyListProxy} from '../../readonly/proxy/ReadOnlyListProxy';
import {EventSource} from '../../../../events/EventSource';
import {ObservableList} from '../ObservableList';
import {ListChangedEventArgs} from '../ListChangedEventArgs';
import {Cloneable} from '../../../../base/Cloneable';


/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export abstract class ObservableListProxy<T, TItems extends ObservableList<T>>
    extends ReadOnlyListProxy<T, TItems>
    implements ObservableList<T>, Cloneable<ObservableList<T>> {

    public get changed(): EventSource<ListChangedEventArgs<T>> {
        return this._items.changed;
    }

    public clone(): ObservableList<T> {
        return this._items.clone();
    }
}
