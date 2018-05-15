import {Disposable} from '@monument/core/main/Disposable';
import {ArrayList} from '@monument/collections/main/ArrayList';
import {Subscription} from './Subscription';
import {Subscriber} from './Subscriber';
import {SubscriptionProvider} from './SubscriptionProvider';


export class Publisher<T> implements SubscriptionProvider<T>, Disposable {
    private readonly _subscriptions: ArrayList<Subscription<T>> = new ArrayList();


    public subscribe(subscriber: Subscriber<T>): Disposable {
        const subscription: Subscription<T> = new Subscription(this._subscriptions, subscriber);

        this._subscriptions.add(subscription);

        return subscription;
    }


    public publish(value: T): void {
        for (const subscription of this._subscriptions) {
            subscription.notify(value);
        }
    }


    public dispose(): void {
        for (const subscription of this._subscriptions) {
            subscription.dispose();
        }
    }
}
