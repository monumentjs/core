
/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @param TResult type of result
 */
export interface Disposable<TResult = void> {
    dispose(): TResult;
}
