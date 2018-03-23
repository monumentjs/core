import {Collection} from '@monument/collections-core/main/Collection';
import {EventSource} from '@monument/events-core/main/EventSource';
import {CollectionChangedEventArgs} from './CollectionChangedEventArgs';


export interface NotifyCollectionChanged<T, TCollection extends Collection<T>> {
    readonly collectionChanged: EventSource<TCollection, CollectionChangedEventArgs>;
}
