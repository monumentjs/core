import {Observer} from './Observer';
import {OnComplete, OnError, OnNext} from './Subscribable';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @immutable
 */
export class PartialObserver<T> implements Observer<T> {
    private readonly _observer: Partial<Observer<T>>;

    public constructor(observer: Partial<Observer<T>>);
    public constructor(next?: OnNext<T>, error?: OnError, complete?: OnComplete);
    public constructor(next?: Partial<Observer<T>> | OnNext<T>, error?: OnError, complete?: OnComplete) {
        this._observer = typeof next === 'object' ? next : {next, error, complete};
    }

    public complete(): void {
        if (this._observer.complete) {
            this._observer.complete();
        }
    }

    public error(error: Error): void {
        if (this._observer.error) {
            this._observer.error(error);
        }
    }

    public next(value: T): void {
        if (this._observer.next) {
            this._observer.next(value);
        }
    }
}
