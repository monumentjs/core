

/**
 * Defines methods to support the comparison of objects for equality.
 */
export interface IEqualityComparator<T> {
    /**
     * Determines whether the specified objects are equal.
     * @param x
     * @param y
     */
    equals(x: T, y: T): boolean;
}

