import {Collection} from '../Collection';
import {ReadOnlyCollectionProxy} from '../../readonly/proxy/ReadOnlyCollectionProxy';
import {Sequence} from '../../readonly/Sequence';
import {EqualityComparator} from '../../../EqualityComparator';
import {IteratorFunction} from '../../IteratorFunction';


export abstract class CollectionProxy<TItem, TItems extends Collection<TItem>> extends ReadOnlyCollectionProxy<TItem, TItems> implements Collection<TItem> {
    public add(item: TItem): boolean {
        return this._items.add(item);
    }

    public addAll(items: Sequence<TItem>): boolean {
        return this._items.addAll(items);
    }

    public clear(): boolean {
        return this._items.clear();
    }

    public remove(item: TItem): boolean;
    public remove(item: TItem, comparator: EqualityComparator<TItem>): boolean;
    public remove(item: TItem, comparator?: EqualityComparator<TItem>): boolean {
        // @ts-ignore
        return this._items.remove(...arguments);
    }

    public removeAll(items: Sequence<TItem>): boolean;
    public removeAll(items: Sequence<TItem>, comparator: EqualityComparator<TItem>): boolean;
    public removeAll(items: Sequence<TItem>, comparator?: EqualityComparator<TItem>): boolean {
        // @ts-ignore
        return this._items.removeAll(...arguments);
    }

    public removeBy(predicate: IteratorFunction<TItem, boolean>): boolean {
        return this._items.removeBy(predicate);
    }

    public retainAll(items: Sequence<TItem>): boolean;
    public retainAll(items: Sequence<TItem>, comparator: EqualityComparator<TItem>): boolean;
    public retainAll(items: Sequence<TItem>, comparator?: EqualityComparator<TItem>): boolean {
        // @ts-ignore
        return this._items.retainAll(...arguments);
    }
    
}
