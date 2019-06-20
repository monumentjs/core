/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface Equatable<T> {
  equals(other: T): boolean;
}
