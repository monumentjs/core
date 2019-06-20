/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @readonly
 */
export interface Sequence<T> extends Iterable<T> {
  readonly length: number;
}
