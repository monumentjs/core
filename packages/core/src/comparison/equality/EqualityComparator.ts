/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface EqualsFunction<T> {
  equals(x: T, y: T): boolean;
}
