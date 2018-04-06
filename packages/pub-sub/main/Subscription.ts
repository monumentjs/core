import {Collection} from '../../collections/main/Collection';
import {Disposable} from '@monument/core/main/Disposable';
import {Subscriber} from './Subscriber';


export class Subscription<T> implements Disposable {
    private _subscriptions: Collection<Subscription<T>>;
    private _subscriber: Subscriber<T>;


    public get subscriber(): Subscriber<T> {
        return this._subscriber;
    }


    public constructor(subscriptions: Collection<Subscription<T>>, subscriber: Subscriber<T>) {
        this._subscriptions = subscriptions;
        this._subscriber = subscriber;
    }


    public dispose(): void {
        this._subscriptions.remove(this);
    }
}
