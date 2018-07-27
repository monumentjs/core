import {ReadOnlyCollection} from '../ReadOnlyCollection';
import {EnumerableProxy} from './EnumerableProxy';
import {EqualityComparator} from '../../../utils/comparison/EqualityComparator';
import {Sequence} from '../Sequence';


export abstract class ReadOnlyCollectionProxy<TItem, TItems extends ReadOnlyCollection<TItem>> extends EnumerableProxy<TItem, TItems> implements ReadOnlyCollection<TItem> {
    public contains(item: TItem): boolean;
    public contains(item: TItem, comparator: EqualityComparator<TItem>): boolean;
    public contains(item: TItem, comparator?: EqualityComparator<TItem>): boolean {
        // @ts-ignore
        return this._items.contains(...arguments);
    }

    public containsAll(items: Sequence<TItem>): boolean;
    public containsAll(items: Sequence<TItem>, comparator: EqualityComparator<TItem>): boolean;
    public containsAll(items: Sequence<TItem>, comparator?: EqualityComparator<TItem>): boolean {
        // @ts-ignore
        return this._items.containsAll(...arguments);
    }
    
}
