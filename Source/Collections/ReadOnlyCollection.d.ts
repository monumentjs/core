import { Enumerable } from './Enumerable';
import { IEqualityComparator } from './IEqualityComparator';
export declare class ReadOnlyCollection<T> extends Enumerable<T> {
    contains(otherItem: T, comparator?: IEqualityComparator<T>): boolean;
}
