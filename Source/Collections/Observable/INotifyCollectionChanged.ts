import {EventHandler} from '../../Events/EventHandler';
import {CollectionChangedEventArgs} from './CollectionChangedEventArgs';
import {ICollection} from '../Abstraction/ICollection';


export interface INotifyCollectionChanged<T, TCollection extends ICollection<T>> {
    readonly collectionChanged: EventHandler<TCollection, CollectionChangedEventArgs>;
}
