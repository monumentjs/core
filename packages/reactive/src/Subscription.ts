import {Disposable, Map} from '@monument/core';
import {Observer} from './Observer';


/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class Subscription<T> implements Disposable {
    private readonly _observers: Map<Observer<T>, Disposable>;
    private readonly _observer: Observer<T>;

    public constructor(observers: Map<Observer<T>, Disposable>, observer: Observer<T>) {
        this._observers = observers;
        this._observer = observer;
    }

    public dispose(): void {
        this._observers.remove(this._observer);
    }
}
