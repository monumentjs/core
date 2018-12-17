import {Disposable} from '@monument/core';
import {Observer} from './Observer';
import {Subject} from './Subject';


/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class Subscription<T> implements Disposable<boolean> {
    private readonly _subject: Subject<T>;
    private readonly _observer: Observer<T>;

    public constructor(subject: Subject<T>, observer: Observer<T>) {
        this._subject = subject;
        this._observer = observer;
    }

    public dispose(): boolean {
        return this._subject.unsubscribe(this._observer);
    }
}
