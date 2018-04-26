import {Disposable} from '@monument/core/main/Disposable';
import {EqualityComparator} from '@monument/core/main/EqualityComparator';
import {StrictEqualityComparator} from '@monument/core/main/StrictEqualityComparator';
import {Map} from '@monument/collections/main/Map';
import {ListMap} from '@monument/collections/main/ListMap';
import {Value} from './Value';
import {Observer} from './Observer';
import {ObserverSubscription} from './ObserverSubscription';


export class ObservableValue<T> implements Value<T>, Disposable {
    private readonly _equalityComparator: EqualityComparator<T>;
    private readonly _observers: Map<Observer<T>, ObserverSubscription<T>> = new ListMap();
    private _value: T;


    public constructor(initialValue: T, equalityComparator: EqualityComparator<T> = StrictEqualityComparator.instance) {
        this._value = initialValue;
        this._equalityComparator = equalityComparator;
    }


    public get(): T {
        return this._value;
    }


    public set(value: T): void {
        if (!this._equalityComparator.equals(this._value, value)) {
            this._value = value;

            this.onChange(value);
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
        for (let {key: observer, value: subscription} of this._observers) {
            observer.onCompleted();
            subscription.dispose();
        }
    }


    private onChange(value: T): void {
        for (let {key: observer} of this._observers) {
            observer.onNext(value);
        }
    }
}
