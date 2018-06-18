import {ReadOnlyCollection} from '../collections/ReadOnlyCollection';
import {CollectionChangedEventArgs} from './CollectionChangedEventArgs';
import {Event} from '../events/Event';


export interface NotifyCollectionChanged<TItem> {
    readonly collectionChanged: Event<ReadOnlyCollection<TItem>, CollectionChangedEventArgs>;
}
