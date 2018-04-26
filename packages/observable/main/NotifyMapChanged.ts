import {ReadOnlyMap} from '@monument/collections/main/ReadOnlyMap';
import {Event} from '@monument/events/main/Event';
import {MapChangedEventArgs} from './MapChangedEventArgs';


export interface NotifyMapChanged<K, V> {
    readonly mapChanged: Event<ReadOnlyMap<K, V>, MapChangedEventArgs>;
}
