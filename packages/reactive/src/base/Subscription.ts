import {Disposable} from '@monument/core';
import {Observer} from './Observer';
import {Subscribable} from './Subscribable';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class Subscription<T> implements Disposable<boolean> {
    private readonly _subscribable: Subscribable<T>;
    private readonly _observer: Observer<T>;

    public constructor(subscribable: Subscribable<T>, observer: Observer<T>) {
        this._subscribable = subscribable;
        this._observer = observer;
    }

    public dispose(): boolean {
        return this._subscribable.unsubscribe(this._observer);
    }
}
