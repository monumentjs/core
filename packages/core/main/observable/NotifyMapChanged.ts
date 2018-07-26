import {ReadOnlyMap} from '../collection/readonly/ReadOnlyMap';
import {MapChangedEventArgs} from './MapChangedEventArgs';
import {Event} from '../events/Event';


export interface NotifyMapChanged<K, V> {
    readonly mapChanged: Event<ReadOnlyMap<K, V>, MapChangedEventArgs>;
}
