import {IObserver} from '../../Core/Abstraction/IObserver';
import {IDisposable} from '../../Core/Abstraction/IDisposable';
import {Map} from '../../Collections/Map';
import {ObserverSubscription} from './ObserverSubscription';


export class ObservableValue<T> implements IDisposable {
    private _observers: Map<IObserver<T>, ObserverSubscription<T>> = new Map();
    private _value: T;


    public get value(): T {
        return this._value;
    }


    public set value(value: T) {
        if (this._value !== value) {
            this._value = value;

            for (let entry of this._observers) {
                const observer: IObserver<T> = entry.key;

                observer.onNext(this.value);
            }
        }
    }


    public constructor(value: T) {
        this._value = value;
    }


    public subscribe(observer: IObserver<T>): IDisposable {
        const oldSubscription = this._observers.get(observer);

        if (oldSubscription != null) {
            return oldSubscription;
        }

        const newSubscription = new ObserverSubscription(this._observers, observer);

        this._observers.put(observer, newSubscription);

        observer.onNext(this.value);

        return newSubscription;
    }


    public dispose(): void {
        for (let {value} of this._observers) {
            value.dispose();
        }
    }
}
