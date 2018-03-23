import {EventSource} from '@monument/events-core/main/EventSource';
import {Map} from '@monument/collections-core/main/Map';
import {MapChangedEventArgs} from './MapChangedEventArgs';


export interface NotifyMapChanged<K, V, TMap extends Map<K, V>> {
    readonly mapChanged: EventSource<TMap, MapChangedEventArgs>;
}
