
/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @param T type of output value
 */
export interface Builder<T> {
    build(): T;
}
