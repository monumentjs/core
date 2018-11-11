
/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @param T type of supplied value
 */
export interface Supplier<T> {
    get(): T;
}
