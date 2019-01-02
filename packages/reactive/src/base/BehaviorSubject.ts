import {Subscription} from './Subscription';
import {Observer} from './Observer';
import {SimpleSubject} from './SimpleSubject';

/**
 * @since 0.0.1
 * @author Alex Chugaev
 */
export class BehaviorSubject<T> extends SimpleSubject<T> {
    private _value: T;

    public get value(): T {
        return this._value;
    }

    public constructor(value: T) {
        super();
        this._value = value;
    }

    public next(value: T): void {
        this._value = value;

        super.next(value);
    }

    protected onSubscriptionAdded(observer: Observer<T>, subscription: Subscription<T>): void {
        super.onSubscriptionAdded(observer, subscription);

        if (observer.next) {
            observer.next(this.value);
        }
    }
}
