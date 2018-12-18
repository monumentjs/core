import {ReadOnlyCollection} from '../../collection/readonly/ReadOnlyCollection';
import {Cloneable} from '../../../base/Cloneable';
import {EqualityComparator} from '../../../comparison/equality/EqualityComparator';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface ReadOnlyList<T> extends ReadOnlyCollection<T>, Cloneable<ReadOnlyList<T>> {
    readonly firstIndex: number;
    readonly lastIndex: number;

    clone(): ReadOnlyList<T>;

    /**
     * @throws {IndexOutOfBoundsException} if index out of bounds
     */
    getAt(index: number): T;

    indexOf(item: T): number;

    indexOf(item: T, comparator: EqualityComparator<T>): number;

    indexOf(item: T, comparator: EqualityComparator<T>, startIndex: number): number;

    indexOf(item: T, comparator: EqualityComparator<T>, startIndex: number, count: number): number;

    lastIndexOf(item: T): number;

    lastIndexOf(item: T, comparator: EqualityComparator<T>): number;

    lastIndexOf(item: T, comparator: EqualityComparator<T>, startIndex: number): number;

    lastIndexOf(item: T, comparator: EqualityComparator<T>, startIndex: number, count: number): number;
}
