import {Disposable} from '@monument/core/main/Disposable';
import {Subscriber} from './Subscriber';


export interface SubscriptionProvider<T> {
    subscribe(subscriber: Subscriber<T>): Disposable;
}
