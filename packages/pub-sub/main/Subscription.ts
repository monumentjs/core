import {Collection} from '@monument/collections/main/Collection';
import {Disposable} from '@monument/core/main/Disposable';
import {Subscriber} from './Subscriber';


export class Subscription<T> implements Disposable {
    private readonly _subscriptions: Collection<Subscription<T>>;
    private readonly _subscriber: Subscriber<T>;


    public constructor(subscriptions: Collection<Subscription<T>>, subscriber: Subscriber<T>) {
        this._subscriptions = subscriptions;
        this._subscriber = subscriber;
    }


    public notify(value: T): void {
        this._subscriber(value);
    }


    public dispose(): void {
        this._subscriptions.remove(this);
    }
}
