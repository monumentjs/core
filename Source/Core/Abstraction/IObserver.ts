import {Exception} from '../../Exceptions/Exception';


export interface IObserver<T> {
    /**
     * Provides the observer with new data.
     */
    onNext(value: T): void;

    /**
     * Notifies the observer that the provider has finished sending push-based notifications.
     */
    onCompleted(): void;

    /**
     * Notifies the observer that the provider has experienced an error condition.
     */
    onError(ex: Exception): void;
}
