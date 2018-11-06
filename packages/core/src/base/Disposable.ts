
/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface Disposable {
    dispose(): void | Promise<void>;
}
