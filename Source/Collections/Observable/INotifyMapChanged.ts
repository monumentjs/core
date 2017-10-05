import {EventHandler} from '../../Events/EventHandler';
import {MapChangedEventArgs} from './MapChangedEventArgs';
import {IMap} from '../Abstraction/IMap';


export interface INotifyMapChanged<K, V, TMap extends IMap<K, V>> {
    readonly mapChanged: EventHandler<TMap, MapChangedEventArgs>;
}
