import {Observer} from '../base/Observer';
import {Subscription} from '../base/Subscription';
import {AbstractObservable} from '../base/AbstractObservable';

/**
 * @since 0.0.1
 * @author Alex Chugaev
 */
export class Future<T> extends AbstractObservable<T> {
    private readonly _promise: Promise<T>;

    public constructor(promise: Promise<T>) {
        super();
        this._promise = promise;
    }

    protected async onSubscriptionAdded(observer: Observer<T>, subscription: Subscription<T>): Promise<void> {
        let value!: T;
        let error: Error | undefined;

        try {
            value = await this._promise;
        } catch (e) {
            error = e;
        }

        if (error) {
            observer.error(error);
        } else {
            observer.next(value);
        }

        observer.complete();

        subscription.dispose();
    }
}
