import {EventSource} from '../../Events/EventSource';
import {MapChangedEventArgs} from './MapChangedEventArgs';
import {IMap} from '../Abstraction/IMap';


export interface INotifyMapChanged<K, V, TTarget extends IMap<K, V> = IMap<K, V>> {
    readonly mapChanged: EventSource<TTarget, MapChangedEventArgs>;
}
