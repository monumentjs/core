import {AbstractObservable} from '../base/AbstractObservable';
import {Subscription} from '../base/Subscription';
import {Observer} from '../base/Observer';

export class IterableObservable<T> extends AbstractObservable<T> {
    private readonly _items: Iterable<T>;

    public constructor(items: Iterable<T>) {
        super();
        this._items = items;
    }

    protected onSubscriptionAdded(observer: Observer<T>, subscription: Subscription<T>): void {
        super.onSubscriptionAdded(observer, subscription);

        for (const item of this._items) {
            observer.next(item);
        }

        observer.complete();

        subscription.dispose();
    }
}
