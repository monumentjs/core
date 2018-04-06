import {Disposable} from '@monument/core/main/Disposable';
import {Map} from '../../collections/main/Map';
import {Observer} from './Observer';


export class ObserverSubscription<T> implements Disposable {
    private _observers: Map<Observer<T>, Disposable>;
    private _observer: Observer<T>;


    public constructor(observers: Map<Observer<T>, Disposable>, observer: Observer<T>) {
        this._observers = observers;
        this._observer = observer;
    }


    public dispose(): void {
        this._observers.remove(this._observer);
    }
}
