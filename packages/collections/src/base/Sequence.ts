/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface Sequence<T> extends Iterable<T> {
  readonly length: number;
}
