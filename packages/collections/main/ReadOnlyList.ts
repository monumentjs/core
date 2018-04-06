import {EqualityComparator} from '../../core/main/EqualityComparator';
import {ReadOnlyCollection} from './ReadOnlyCollection';
import {Queryable} from './Queryable';
import {List} from './List';


export interface ReadOnlyList<T> extends ReadOnlyCollection<T>, Queryable<T> {
    getAt(index: number): T;
    indexOf(item: T, startIndex?: number, count?: number, comparator?: EqualityComparator<T>): number;
    lastIndexOf(item: T, startIndex?: number, count?: number, comparator?: EqualityComparator<T>): number;
    slice(offset: number, length: number): List<T>;
}
