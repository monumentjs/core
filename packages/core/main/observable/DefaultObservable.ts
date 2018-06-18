import {ListMap} from '../collections/ListMap';
import {Map} from '../collections/Map';
import {Observable} from './Observable';
import {Observer} from './Observer';
import {ObserverSubscription} from './ObserverSubscription';
import {Disposable} from '../Disposable';
import {Exception} from '../exceptions/Exception';


export class DefaultObservable<T> implements Observable<T>, Observer<T> {
    private readonly _observers: Map<Observer<T>, Disposable> = new ListMap();


    public subscribe(observer: Observer<T>): Disposable {
        const subscription: Disposable = new ObserverSubscription(this._observers, observer);

        this._observers.put(observer, subscription);

        return subscription;
    }


    public onNext(value: T): void {
        for (const {key: observer} of this._observers) {
            observer.onNext(value);
        }
    }


    public onCompleted(): void {
        for (const {key: observer} of this._observers) {
            observer.onCompleted();
        }
    }


    public onError(ex: Exception): void {
        for (const {key: observer} of this._observers) {
            observer.onError(ex);
        }
    }
}
