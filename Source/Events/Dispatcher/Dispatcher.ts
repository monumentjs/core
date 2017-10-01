import {IDisposable} from '../../Core/Abstraction/IDisposable';
import {Subscription} from './Subscription';
import {Subscriber} from './Subscriber';
import {Collection} from '../../Collections/Collection';


export class Dispatcher<T> implements IDisposable {
    protected readonly _subscriptions: Collection<Subscription<T>> = new Collection();


    public subscribe(subscriber: Subscriber<T>): IDisposable {
        const subscription = new Subscription(this._subscriptions, subscriber);

        this._subscriptions.add(subscription);

        return subscription;
    }


    public dispatch(value: T): void {
        for (let subscription of this._subscriptions) {
            subscription.subscriber(value);
        }
    }


    public dispose(): void {
        for (let subscription of this._subscriptions) {
            subscription.dispose();
        }
    }
}
