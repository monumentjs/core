import {Disposable} from '@monument/core/main/Disposable';
import {Map} from '@monument/collections-core/main/Map';
import {ListMap} from '@monument/collections/main/ListMap';
import {EventArgs} from './EventArgs';
import {EventSource} from './EventSource';
import {EventSubscription} from './EventSubscription';
import {EventHandlerFunction} from './types';


export class EventDispatcher<TTarget extends object, TArgs extends EventArgs> implements EventSource<TTarget, TArgs>, Disposable {
    protected readonly _subscriptions: Map<EventHandlerFunction<TTarget, TArgs>, EventSubscription<TTarget, TArgs>> = new ListMap();
    protected _target: TTarget;


    public constructor(target: TTarget) {
        this._target = target;
    }


    public subscribe(callback: EventHandlerFunction<TTarget, TArgs>): Disposable {
        const subscription: EventSubscription<object, EventArgs> = new EventSubscription(this._subscriptions, callback);

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
