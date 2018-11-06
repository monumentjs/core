
/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface Mergeable<T> {
    merge(other: T): T;
}
