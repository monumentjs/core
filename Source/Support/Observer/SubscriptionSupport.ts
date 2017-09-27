import {IObservable} from '../../Core/Abstraction/IObservable';
import {Map} from '../../Collections/Map';
import {IObserver} from '../../Core/Abstraction/IObserver';
import {IDisposable} from '../../Core/Abstraction/IDisposable';
import {SubscriptionCancellationToken} from './SubscriptionCancellationToken';


export abstract class SubscriptionSupport<T> implements IObservable<T> {
    protected _observers: Map<IObserver<T>, IDisposable> = new Map();


    public subscribe(observer: IObserver<T>): IDisposable {
        if (!this._observers.containsKey(observer)) {
            const cancellationToken = new SubscriptionCancellationToken(this._observers, observer);

            this._observers.put(observer, cancellationToken);
        }

        return this._observers.get(observer) as IDisposable;
    }
}
