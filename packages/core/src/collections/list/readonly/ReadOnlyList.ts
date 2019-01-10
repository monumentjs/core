import {ReadOnlyCollection} from '../../collection/readonly/ReadOnlyCollection';
import {EqualityComparator} from '../../../comparison/equality/EqualityComparator';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @readonly
 */
export interface ReadOnlyList<T> extends ReadOnlyCollection<T> {
    readonly firstIndex: number;
    readonly lastIndex: number;

    /**
     * @throws {IndexOutOfBoundsException} if index out of bounds
     */
    getAt(index: number): T;

    indexOf(item: T): number;

    indexOf(item: T, comparator: EqualityComparator<T>): number;

    indexOf(item: T, startIndex: number): number;

    indexOf(item: T, startIndex: number, comparator: EqualityComparator<T>): number;

    indexOf(item: T, startIndex: number, count: number): number;

    indexOf(item: T, startIndex: number, count: number, comparator: EqualityComparator<T>): number;

    lastIndexOf(item: T): number;

    lastIndexOf(item: T, comparator: EqualityComparator<T>): number;

    lastIndexOf(item: T, startIndex: number): number;

    lastIndexOf(item: T, startIndex: number, comparator: EqualityComparator<T>): number;

    lastIndexOf(item: T, startIndex: number, count: number): number;

    lastIndexOf(item: T, startIndex: number, count: number, comparator: EqualityComparator<T>): number;
}
