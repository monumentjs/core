import {noop} from '@monument/core';
import {Observer} from './Observer';
import {Observable} from './Observable';
import {SubscriptionProducer} from './SubscriptionProducer';

export class Subject<T> extends Observable<T> implements Observer<T> {

    public constructor(subscribe: SubscriptionProducer<T> = noop) {
        super(subscribe);
    }

    public next(value: T): void {
        for (const observer of this.observers) {
            observer.next(value);
        }
    }

    public complete(): void {
        for (const observer of this.observers) {
            observer.complete();
        }
    }

    public error(error: Error): void {
        for (const observer of this.observers) {
            observer.error(error);
        }
    }
}
