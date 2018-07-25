import {ReadOnlyCollection} from '../collection/ReadOnlyCollection';
import {CollectionChangedEventArgs} from './CollectionChangedEventArgs';
import {Event} from '../events/Event';


export interface NotifyCollectionChanged<TItem> {
    readonly collectionChanged: Event<ReadOnlyCollection<TItem>, CollectionChangedEventArgs>;
}
