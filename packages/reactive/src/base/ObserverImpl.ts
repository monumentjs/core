import {Observer} from './Observer';
import {OnComplete, OnError, OnNext} from './Subscribable';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @immutable
 */
export class ObserverImpl<T> implements Observer<T> {
    private readonly _next?: OnNext<T>;
    private readonly _error?: OnError;
    private readonly _complete?: OnComplete;

    public constructor(next?: OnNext<T>, error?: OnError, complete?: OnComplete) {
        this._next = next;
        this._error = error;
        this._complete = complete;
    }

    public complete(): void {
        if (this._complete) {
            this._complete();
        }
    }

    public error(error: Error): void {
        if (this._error) {
            this._error(error);
        }
    }

    public next(value: T): void {
        if (this._next) {
            this._next(value);
        }
    }
}
