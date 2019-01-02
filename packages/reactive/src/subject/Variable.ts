import {EqualityComparator, StrictEqualityComparator} from '@monument/core';
import {Observer} from '../base/Observer';
import {Subscription} from '../base/Subscription';
import {BehaviorSubject} from '../base/BehaviorSubject';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class Variable<T> extends BehaviorSubject<T> {
    private readonly _valueComparator: EqualityComparator<T>;

    public constructor(initialValue: T, valueComparator: EqualityComparator<T> = StrictEqualityComparator.get()) {
        super(initialValue);
        this._valueComparator = valueComparator;
    }

    public next(value: T): void {
        if (!this._valueComparator.equals(this.value, value)) {
            super.next(value);
        }
    }

    protected onSubscriptionAdded(observer: Observer<T>, subscription: Subscription<T>): void {
        observer.next(this.value);
    }
}
