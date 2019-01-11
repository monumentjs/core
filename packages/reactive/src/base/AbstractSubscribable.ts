import {LinkedMap} from '@monument/core';
import {Observer} from './Observer';
import {OnComplete, OnError, OnNext, Subscribable} from './Subscribable';
import {Subscription} from './Subscription';
import {ObserverImpl} from './ObserverImpl';

export abstract class AbstractSubscribable<T> implements Subscribable<T>, Iterable<Observer<T>> {
    private readonly _observers: LinkedMap<Observer<T>, Subscription<T>> = new LinkedMap();

    public* [Symbol.iterator](): Iterator<Observer<T>> {
        for (const observer of this._observers.keys) {
            yield observer;
        }
    }

    public subscribe(observer: Observer<T>): Subscription<T>;
    public subscribe(next?: OnNext<T>, error?: OnError, complete?: OnComplete): Subscription<T>;
    public subscribe(next?: Observer<T> | OnNext<T>, error?: OnError, complete?: OnComplete): Subscription<T> {
        const observer = typeof next === 'object' ? next : new ObserverImpl(next, error, complete);
        const existingSubscription: Subscription<T> | undefined = this._observers.get(observer);

        if (existingSubscription != null) {
            return existingSubscription;
        }

        const newSubscription: Subscription<T> = new Subscription(this, observer);

        this._observers.put(observer, newSubscription);

        this.onSubscriptionAdded(observer, newSubscription);

        return newSubscription;
    }


    public unsubscribe(observer: Observer<T>): boolean {
        const subscription: Subscription<T> | undefined = this._observers.remove(observer);
        const unsubscribed: boolean = subscription != null;

        if (subscription != null) {
            this.onSubscriptionCancelled(observer, subscription);
        }

        return unsubscribed;
    }

    protected onSubscriptionAdded(observer: Observer<T>, subscription: Subscription<T>): void {
        // Placeholder
    }

    protected onSubscriptionCancelled(observer: Observer<T>, subscription: Subscription<T>): void {
        // Placeholder
    }

}
