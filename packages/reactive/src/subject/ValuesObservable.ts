import {Subscription} from '../base/Subscription';
import {Observer} from '../base/Observer';
import {AbstractObservable} from '../base/AbstractObservable';

/**
 * @since 0.0.1
 * @author Alex Chugaev
 */
export class ValuesObservable<T> extends AbstractObservable<T> {
    private readonly _values: T[];

    public constructor(...values: T[]) {
        super();
        this._values = values;
    }

    protected onSubscriptionAdded(observer: Observer<T>, subscription: Subscription<T>): void {
        super.onSubscriptionAdded(observer, subscription);

        for (const value of this._values) {
            observer.next(value);
        }

        observer.complete();

        subscription.dispose();
    }
}
