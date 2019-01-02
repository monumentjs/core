import {BehaviorSubject} from '../base/BehaviorSubject';
import {Subscription} from '../base/Subscription';
import {Observer} from '../base/Observer';
import {InvalidOperationException} from '@monument/core';

/**
 * @since 0.0.1
 * @author Alex Chugaev
 */
export class Constant<T> extends BehaviorSubject<T> {

    public next(value: T): void {
        throw new InvalidOperationException('Value assignment is forbidden.');
    }

    protected onSubscriptionAdded(observer: Observer<T>, subscription: Subscription<T>): void {
        super.onSubscriptionAdded(observer, subscription);

        observer.complete();

        subscription.dispose();
    }
}
