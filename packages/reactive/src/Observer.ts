import {Exception} from '@monument/core';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface Observer<T> {
    /**
     * Provides the observer with new data.
     */
    onNext(value: T): void;

    /**
     * Notifies the observer that the provider has finished sending push-based notifications.
     */
    onComplete?(): void;

    /**
     * Notifies the observer that the provider has experienced an error condition.
     */
    onError?(ex: Exception): void;
}
