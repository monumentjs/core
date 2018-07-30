import {ReadOnlyCollection} from '../ReadOnlyCollection';
import {EnumerableProxy} from './EnumerableProxy';
import {EqualityComparator} from '../../../utils/comparison/EqualityComparator';
import {Sequence} from '../Sequence';


export abstract class ReadOnlyCollectionProxy<T, TItems extends ReadOnlyCollection<T>> extends EnumerableProxy<T, TItems> implements ReadOnlyCollection<T> {
    public contains(item: T): boolean;
    public contains(item: T, comparator: EqualityComparator<T>): boolean;
    public contains(item: T, comparator?: EqualityComparator<T>): boolean {
        // @ts-ignore
        return this._items.contains(...arguments);
    }

    public containsAll(items: Sequence<T>): boolean;
    public containsAll(items: Sequence<T>, comparator: EqualityComparator<T>): boolean;
    public containsAll(items: Sequence<T>, comparator?: EqualityComparator<T>): boolean {
        // @ts-ignore
        return this._items.containsAll(...arguments);
    }
    
}
