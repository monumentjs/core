import {SubscriptionSupport} from './SubscriptionSupport';
import {IObserver} from '../../Core/Abstraction/IObserver';
import {IDisposable} from '../../Core/Abstraction/IDisposable';


export class ObservableValue<T> extends SubscriptionSupport<T> {
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
        super();

        this._value = value;
    }


    public subscribe(observer: IObserver<T>): IDisposable {
        const isNewObserver: boolean = !this._observers.containsKey(observer);
        const cancellationToken: IDisposable = super.subscribe(observer);

        if (isNewObserver) {
            observer.onNext(this.value);
        }

        return cancellationToken;
    }
}
