import {ArrayList} from '@monument/core';
import {OnComplete, OnError, OnNext, Subscribable} from './Subscribable';
import {Observer} from './Observer';
import {Subscription} from './Subscription';
import {SubscriptionProducer} from './SubscriptionProducer';
import {ProtectedObserver} from './ProtectedObserver';
import {PartialObserver} from './PartialObserver';
import {SubscriptionTeardownLogic} from './SubscriptionTeardownLogic';

export type OperatorFunction<T, R> = (input: Observable<T>) => Observable<R>;

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class Observable<T> implements Subscribable<T> {
    private readonly _observers: ArrayList<Observer<T>> = new ArrayList();
    private readonly _subscribe: SubscriptionProducer<T>;

    public get observers(): Iterable<Observer<T>> {
        return this._observers;
    }

    public get observersCount(): number {
        return this._observers.length;
    }

    public constructor(subscribe: SubscriptionProducer<T>) {
        this._subscribe = subscribe;
    }

    public subscribe(observer: Partial<Observer<T>>): Subscription;
    public subscribe(next?: OnNext<T>, error?: OnError, complete?: OnComplete): Subscription;
    public subscribe(next?: Partial<Observer<T>> | OnNext<T>, error?: OnError, complete?: OnComplete): Subscription {
        const observer: Observer<T> = new ProtectedObserver(new PartialObserver(next as any, error, complete));
        const teardownLogic: SubscriptionTeardownLogic | void = this._subscribe(observer);
        const subscription: Subscription = new Subscription(() => {
            this._observers.remove(observer);
        });

        if (teardownLogic) {
            subscription.add(teardownLogic);
        }

        this._observers.add(observer);

        return subscription;
    }

    public pipe<O>(operator: OperatorFunction<T, O>): Observable<O> {
        return operator(this);
    }
}
