/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface Observer<T> {
    /**
     * Provides the observer with new data.
     */
    next(value: T): void;

    /**
     * Notifies the observer that the provider has finished sending push-based notifications.
     */
    complete(): void;

    /**
     * Notifies the observer that the provider has experienced an error condition.
     */
    error(ex: Error): void;
}
