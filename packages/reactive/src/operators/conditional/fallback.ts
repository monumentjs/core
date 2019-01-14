import {Supplier} from '@monument/core';
import {Observable, OperatorFunction} from '../../base/Observable';
import {Subject} from '../../base/Subject';
import {Observer} from '../../base/Observer';
import {Subscription} from '../../base/Subscription';

export function fallback<T>(supplier: Supplier<T>): OperatorFunction<T, T> {
    return (input: Observable<T>): Observable<T> => {
        let lastValue!: T;
        let lastValueInitialized: boolean = false;

        const subject: Subject<T> = new Subject((observer: Observer<T>) => {
            if (lastValueInitialized) {
                observer.next(lastValue);
            } else {
                observer.next(supplier());
            }

            return subscription;
        });

        const subscription: Subscription = input.subscribe((value: T) => {
            lastValueInitialized = true;
            lastValue = value;
            subject.next(value);
        });

        return subject;
    };
}
