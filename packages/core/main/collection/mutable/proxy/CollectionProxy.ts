import {Collection} from '../Collection';
import {ReadOnlyCollectionProxy} from '../../readonly/proxy/ReadOnlyCollectionProxy';
import {Sequence} from '../../readonly/Sequence';
import {EqualityComparator} from '../../../utils/comparison/EqualityComparator';
import {IteratorFunction} from '../../IteratorFunction';


export abstract class CollectionProxy<T, TItems extends Collection<T>> extends ReadOnlyCollectionProxy<T, TItems> implements Collection<T> {
    public add(item: T): boolean {
        return this._items.add(item);
    }

    public addAll(items: Sequence<T>): boolean {
        return this._items.addAll(items);
    }

    public clear(): boolean {
        return this._items.clear();
    }

    public remove(item: T): boolean;
    public remove(item: T, comparator: EqualityComparator<T>): boolean;
    public remove(item: T, comparator?: EqualityComparator<T>): boolean {
        // @ts-ignore
        return this._items.remove(...arguments);
    }

    public removeAll(items: Sequence<T>): boolean;
    public removeAll(items: Sequence<T>, comparator: EqualityComparator<T>): boolean;
    public removeAll(items: Sequence<T>, comparator?: EqualityComparator<T>): boolean {
        // @ts-ignore
        return this._items.removeAll(...arguments);
    }

    public removeBy(predicate: IteratorFunction<T, boolean>): boolean {
        return this._items.removeBy(predicate);
    }

    public retainAll(items: Sequence<T>): boolean;
    public retainAll(items: Sequence<T>, comparator: EqualityComparator<T>): boolean;
    public retainAll(items: Sequence<T>, comparator?: EqualityComparator<T>): boolean {
        // @ts-ignore
        return this._items.retainAll(...arguments);
    }
}
