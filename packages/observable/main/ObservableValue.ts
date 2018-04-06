import {Map} from '../../collections/main/Map';
import {ListMap} from '@monument/collections/main/ListMap';
import {Value} from '@monument/observer-core/main/Value';
import {Observable} from '@monument/observer-core/main/Observable';
import {ObserverSubscription} from '@monument/observer-core/main/ObserverSubscription';
import {Observer} from '@monument/observer-core/main/Observer';
import {Disposable} from '@monument/core/main/Disposable';


export class ObservableValue<T> implements Value<T>, Observable<T>, Disposable {
    private _observers: Map<Observer<T>, ObserverSubscription<T>> = new ListMap();
    private _value: T;


    public constructor(value: T) {
        this._value = value;
    }


    public get(): T {
        return this._value;
    }


    public set(value: T): void {
        if (this._value !== value) {
            this._value = value;

            for (let entry of this._observers) {
                const observer: Observer<T> = entry.key;

                observer.onNext(value);
            }
        }
    }


    public subscribe(observer: Observer<T>): Disposable {
        const existingSubscription: ObserverSubscription<T> | undefined = this._observers.get(observer);

        if (existingSubscription != null) {
            return existingSubscription;
        }

        const newSubscription: ObserverSubscription<T> = new ObserverSubscription(this._observers, observer);

        this._observers.put(observer, newSubscription);

        observer.onNext(this._value);

        return newSubscription;
    }


    public dispose(): void {
        for (let {key, value} of this._observers) {
            key.onCompleted();
            value.dispose();
        }
    }
}
