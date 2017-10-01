import {IDisposable} from '../../Core/Abstraction/IDisposable';
import {Subscriber} from './Subscriber';
import {Collection} from '../../Collections/Collection';


export class Subscription<T> implements IDisposable {
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
