
/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export type MapIteratorFunction<K, V, TResult> = (key: K, value: V) => TResult;
