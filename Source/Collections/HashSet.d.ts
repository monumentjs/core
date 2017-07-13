import { Collection } from './Collection';
import { ISet } from './ISet';
import { IEqualityComparator } from './IEqualityComparator';
import { IEnumerable } from './IEnumerable';
export declare class HashSet<T> extends Collection<T> implements ISet<T> {
    private _comparator;
    readonly comparator: IEqualityComparator<T>;
    constructor(items?: IEnumerable<T>, comparator?: IEqualityComparator<T>);
    add(item: T): boolean;
    remove(otherItem: T): boolean;
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
