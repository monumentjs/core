import {EventSource} from '../../Events/EventSource';
import {CollectionChangedEventArgs} from './CollectionChangedEventArgs';
import {ICollection} from '../Abstraction/ICollection';


export interface INotifyCollectionChanged<T, TCollection extends ICollection<T>> {
    readonly collectionChanged: EventSource<TCollection, CollectionChangedEventArgs>;
}
