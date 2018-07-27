

export interface Mergeable<T> {
    merge(other: T): T;
}
