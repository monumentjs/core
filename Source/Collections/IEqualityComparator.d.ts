export interface IEqualityComparator<T> {
    equals(x: T, y: T): boolean;
}
