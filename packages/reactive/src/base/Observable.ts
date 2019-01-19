import {ArrayList} from '@monument/core';
import {OnComplete, OnError, OnNext, Subscribable} from './Subscribable';
import {Observer} from './Observer';
import {Subscription} from './Subscription';
import {SubscribeFunction} from './SubscribeFunction';
import {ProtectedObserver} from './ProtectedObserver';
import {PartialObserver} from './PartialObserver';
import {TeardownLogic} from './TeardownLogic';

export type OperatorFunction<T, R> = (input: Observable<T>) => Observable<R>;

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class Observable<T> implements Subscribable<T> {
    public static of<T>(...values: T[]): Observable<T> {
        return this.from(values);
    }

    public static from<T>(values: Iterable<T>): Observable<T> {
        return new Observable((observer: Observer<T>) => {
            for (const value of values) {
                observer.next(value);
            }

            observer.complete();
        });
    }

    public static just<T>(value: T): Observable<T> {
        return new Observable((observer: Observer<T>) => {
            observer.next(value);
            observer.complete();
        });
    }

    private readonly _observers: ArrayList<Observer<T>> = new ArrayList();
    private readonly _subscribe: SubscribeFunction<T>;

    public get observers(): Iterable<Observer<T>> {
        return this._observers;
    }

    public get observersCount(): number {
        return this._observers.length;
    }

    public constructor(subscribe: SubscribeFunction<T>) {
        this._subscribe = subscribe;
    }

    public subscribe(observer: Partial<Observer<T>>): Subscription;
    public subscribe(next?: OnNext<T>, error?: OnError, complete?: OnComplete): Subscription;
    public subscribe(next?: Partial<Observer<T>> | OnNext<T>, error?: OnError, complete?: OnComplete): Subscription {
        const observer: Observer<T> = new ProtectedObserver(new PartialObserver(next as any, error, complete));
        const teardownLogic: TeardownLogic = this._subscribe(observer);
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
