import {EventSource} from '../../Events/EventSource';
import {MapChangedEventArgs} from './MapChangedEventArgs';
import {IMap} from '../Abstraction/IMap';


export interface INotifyMapChanged<K, V, TMap extends IMap<K, V>> {
    readonly onMapChanged: EventSource<TMap, MapChangedEventArgs>;
}
