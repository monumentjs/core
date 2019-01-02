import {Observer} from '../base/Observer';
import {Subscription} from '../base/Subscription';
import {AbstractSubscribable} from '../base/AbstractSubscribable';

/**
 * @since 0.0.1
 * @author Alex Chugaev
 */
export class Future<T> extends AbstractSubscribable<T> {
    private readonly _promise: Promise<T>;

    public constructor(promise: Promise<T>) {
        super();
        this._promise = promise;
    }

    protected async onSubscriptionAdded(observer: Observer<T>, subscription: Subscription<T>) {
        try {
            const value: T = await this._promise;

            observer.next(value);
            observer.complete();
        } catch (e) {
            observer.error(e);
            observer.complete();
        }

        subscription.dispose();
    }
}
