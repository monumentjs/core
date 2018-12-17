import {Exception, LinkedMap} from '@monument/core';
import {Subject} from './Subject';
import {Observer} from './Observer';
import {Subscription} from './Subscription';
import {SubjectState} from './SubjectState';

export abstract class AbstractSubject<T> implements Subject<T> {
    private _subjectState: SubjectState = SubjectState.IDLE;
    private readonly _observers: LinkedMap<Observer<T>, Subscription<T>> = new LinkedMap();

    public get subjectState(): SubjectState {
        return this._subjectState;
    }

    public get isBroken(): boolean {
        return this.subjectState === SubjectState.BROKEN;
    }

    public get isComplete(): boolean {
        return this.subjectState === SubjectState.COMPLETE;
    }

    public get isActive(): boolean {
        return this.subjectState === SubjectState.ACTIVE;
    }

    public get isIdle(): boolean {
        return this.subjectState === SubjectState.IDLE;
    }

    public subscribe(observer: Observer<T>): Subscription<T> {
        const oldLength: number = this._observers.length;
        const existingSubscription: Subscription<T> | undefined = this._observers.get(observer);

        if (existingSubscription != null) {
            return existingSubscription;
        }

        const newSubscription: Subscription<T> = new Subscription(this, observer);

        this._observers.put(observer, newSubscription);

        if (oldLength === 0) {
            this.setSubjectState(SubjectState.ACTIVE);
        }

        if (this.onNewSubscription) {
            this.onNewSubscription(observer, newSubscription);
        }

        return newSubscription;
    }

    public unsubscribe(observer: Observer<T>): boolean {
        const oldLength: number = this._observers.length;
        const unsubscribed: boolean = this._observers.remove(observer) != null;

        if (oldLength > 0 && this._observers.isEmpty) {
            this._subjectState = SubjectState.IDLE;
        }

        return unsubscribed;
    }

    protected next(payload: T): void {
        if (!this.isComplete && !this.isBroken) {
            for (const {key: observer} of this._observers) {
                observer.onNext(payload);
            }
        }
    }

    protected complete(): void {
        if (!this.isComplete && !this.isBroken) {
            for (const {key: observer} of this._observers) {
                if (observer.onComplete) {
                    observer.onComplete();
                }
            }

            this._subjectState = SubjectState.COMPLETE;
        }
    }

    protected throw(ex: Exception): void {
        if (!this.isComplete && !this.isBroken) {
            for (const {key: observer} of this._observers) {
                if (observer.onError) {
                    observer.onError(ex);
                }
            }

            this._subjectState = SubjectState.BROKEN;
        }
    }

    protected abstract onNewSubscription?(observer: Observer<T>, subscription: Subscription<T>): void;

    private setSubjectState(state: SubjectState) {
        if (this._subjectState !== state) {
            this._subjectState = state;
        }
    }
}
