import {Disposable} from '@monument/core/main/Disposable';
import {Collection} from '../../collections/main/Collection';
import {ArrayList} from '@monument/collections/main/ArrayList';
import {Subscription} from './Subscription';
import {Subscriber} from './Subscriber';
import {SubscriptionProvider} from './SubscriptionProvider';


export class Publisher<T> implements SubscriptionProvider<T>, Disposable {
    private subscriptions: Collection<Subscription<T>> = new ArrayList();


    public subscribe(subscriber: Subscriber<T>): Disposable {
        const subscription = new Subscription(this.subscriptions, subscriber);

        this.subscriptions.add(subscription);

        return subscription;
    }


    public publish(value: T): void {
        for (let subscription of this.subscriptions) {
            subscription.subscriber(value);
        }
    }


    public dispose(): void {
        for (let subscription of this.subscriptions) {
            subscription.dispose();
        }
    }
}
