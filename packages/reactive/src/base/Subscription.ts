import { ArraySet } from '@monument/core';
import { TeardownLogic } from './TeardownLogic';
import { Unsubscribable } from './Unsubscribable';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class Subscription implements Unsubscribable {
    public static CLOSED: Subscription = ((subscription: Subscription) => {
        subscription._isClosed = true;

        return subscription;
    })(new Subscription());

    private _isClosed: boolean = false;
    private readonly _parents: ArraySet<Subscription> = new ArraySet();
    private readonly _children: ArraySet<Subscription> = new ArraySet();
    private readonly _unsubscribe?: () => void;

    public get isClosed(): boolean {
        return this._isClosed;
    }

    public constructor(unsubscribe?: () => void) {
        this._unsubscribe = unsubscribe;
    }

    public add(teardownLogic: TeardownLogic): Subscription {
        if (this.isClosed) {
            this.teardown(teardownLogic);

            return Subscription.CLOSED;
        }

        if (teardownLogic === this) {
            return this;
        }

        const subscription: Subscription = new Subscription(() => {
            this.teardown(teardownLogic);
        });

        subscription._parents.add(this);

        this._children.add(subscription);

        return subscription;
    }

    public unsubscribe(): void {
        if (this.isClosed) {
            return;
        }

        this._isClosed = true;

        this.detachFromParents();
        this.doUnsubscribe();
        this.cancelChildrenSubscriptions();

        this._children.clear();
    }

    private detachFromParents() {
        for (const parent of this._parents) {
            parent._children.remove(this);
        }
    }

    private doUnsubscribe() {
        if (this._unsubscribe) {
            this._unsubscribe();
        }
    }

    private cancelChildrenSubscriptions() {
        for (const childSubscription of this._children) {
            childSubscription.unsubscribe();
        }
    }

    private teardown(teardownLogic: TeardownLogic): void {
        switch (typeof teardownLogic) {
            case 'function':
                teardownLogic();
                break;
            case 'object':
                teardownLogic.unsubscribe();
                break;
        }
    }
}
