import {Map} from '../collections/map/mutable/Map';
import {Observer} from './Observer';
import {Disposable} from '../base/Disposable';


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
