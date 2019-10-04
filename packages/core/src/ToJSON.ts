/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @param T shape of serialized JSON
 */
export interface ToJSON<T> {
  toJSON(): T;
}
