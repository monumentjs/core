import {ReadOnlyCollection} from '@monument/collections/main/ReadOnlyCollection';
import {Event} from '@monument/events/main/Event';
import {CollectionChangedEventArgs} from './CollectionChangedEventArgs';


export interface NotifyCollectionChanged<TItem> {
    readonly collectionChanged: Event<ReadOnlyCollection<TItem>, CollectionChangedEventArgs>;
}
