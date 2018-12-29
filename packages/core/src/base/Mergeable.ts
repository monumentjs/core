/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @param T type of other object to merge with current object
 */
export interface Mergeable<T> {
    merge(other: T): T;
}
