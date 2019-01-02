import {Observer} from './Observer';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class ObserverImpl<T> implements Observer<T> {
    private readonly _next?: (value: T) => void;
    private readonly _error?: (error: Error) => void;
    private readonly _complete?: () => void;

    public constructor(next?: (value: T) => void, error?: (error: Error) => void, complete?: () => void) {
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
