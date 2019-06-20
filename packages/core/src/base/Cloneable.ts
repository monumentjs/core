/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @param T type of cloned value
 */
export interface Cloneable<T> {
  /**
   * Creates new object that is a copy of the current instance.
   */
  clone(): T;
}
