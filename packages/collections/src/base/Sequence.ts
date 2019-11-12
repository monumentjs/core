/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface Sequence<T> extends Iterable<T> {
  /**
   * Gets count of elements in sequence.
   * @author Alex Chugaev
   * @since 0.0.1
   */
  readonly length: number;
}
