import {EventArgs} from './EventArgs';
import {IDisposable} from '../Core/Abstraction/IDisposable';
import {Map} from '../Collections/Map';
import {EventSubscription} from './EventSubscription';
import {EventHandlerFunction} from './types';


export class EventHandler<TTarget extends object = object, TArgs extends EventArgs = EventArgs> {
    protected _subscriptions: Map<EventHandlerFunction<TTarget, TArgs>, EventSubscription<TTarget, TArgs>> = new Map();


    public subscribe(callback: EventHandlerFunction<TTarget, TArgs>): IDisposable {
        const subscription = new EventSubscription(this._subscriptions, callback);

        this._subscriptions.put(callback, subscription);

        return subscription;
    }
}
