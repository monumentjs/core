import {EventSource} from '../../Events/EventSource';
import {CollectionChangedEventArgs} from './CollectionChangedEventArgs';
import {ICollection} from '../Abstraction/ICollection';


export interface INotifyCollectionChanged<T> {
    readonly onCollectionChanged: EventSource<ICollection<T>, CollectionChangedEventArgs>;
}
