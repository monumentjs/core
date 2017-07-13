import { ICollection } from './ICollection';
import { IEqualityComparator } from './IEqualityComparator';
import { IEnumerable } from './IEnumerable';
export interface ISet<T> extends ICollection<T> {
    readonly comparator: IEqualityComparator<T>;
    add(item: T): boolean;
    contains(item: T): boolean;
    exceptWith(other: IEnumerable<T>): void;
    intersectWith(other: IEnumerable<T>): void;
    isSubsetOf(other: IEnumerable<T>): boolean;
    isSupersetOf(other: IEnumerable<T>): boolean;
    isProperSubsetOf(other: IEnumerable<T>): boolean;
    isProperSupersetOf(other: IEnumerable<T>): boolean;
    overlaps(other: IEnumerable<T>): boolean;
    setEquals(other: IEnumerable<T>): boolean;
    symmetricExceptWith(other: IEnumerable<T>): void;
    unionWith(other: IEnumerable<T>): void;
}
