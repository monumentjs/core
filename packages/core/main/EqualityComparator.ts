

export interface EqualityComparator<T> {
    equals(x: T, y: T): boolean;
}
