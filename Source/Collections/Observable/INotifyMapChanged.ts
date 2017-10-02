import {EventSource} from '../../Events/EventSource';
import {MapChangedEventArgs} from './MapChangedEventArgs';
import {IMap} from '../Abstraction/IMap';


export interface INotifyMapChanged<K, V> {
    readonly onMapChanged: EventSource<IMap<K, V>, MapChangedEventArgs>;
}
