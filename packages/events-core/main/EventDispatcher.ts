import {Disposable} from '@monument/core/main/Disposable';
import {Map} from '@monument/collections/main/Map';
import {ListMap} from '@monument/collections/main/ListMap';
import {EventArgs} from './EventArgs';
import {EventSource} from './EventSource';
import {EventSubscription} from './EventSubscription';
import {EventHandlerFunction} from './types';


export class EventDispatcher<TArgs extends EventArgs> implements EventSource<TArgs>, Disposable {
    private readonly _subscriptions: Map<EventHandlerFunction<TArgs>, EventSubscription<TArgs>> = new ListMap();
    private readonly _target: object;


    public constructor(target: object) {
        this._target = target;
    }


    public subscribe(callback: EventHandlerFunction<TArgs>): Disposable {
        const subscription: EventSubscription<EventArgs> = new EventSubscription(this._subscriptions, callback);

        this._subscriptions.put(callback, subscription);

        return subscription;
    }


    public dispatch(args: TArgs): void {
        for (let {value} of this._subscriptions) {
            value.handler(this._target, args);

            if (args.isCancelled) {
                break;
            }
        }
    }


    public dispose(): void {
        for (let {value} of this._subscriptions) {
            value.dispose();
        }
    }
}
