import {IEqualityComparator} from './IEqualityComparator';
import {IEnumerable} from './IEnumerable';


export interface ICollection<T> extends IEnumerable<T> {
    /**
     * Gets a value indicating whether the ICollection<T> is read-only.
     */
    readonly isReadOnly: boolean;
    add(item: T): void;
    contains(item: T, comparator?: IEqualityComparator<T>): boolean;
    remove(item: T): boolean;
    clear(): void;
}

