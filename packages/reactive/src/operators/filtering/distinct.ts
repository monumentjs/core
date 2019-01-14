import {EqualityComparator, StrictEqualityComparator} from '@monument/core';
import {Observable, OperatorFunction} from '../../base/Observable';
import {Subject} from '../../base/Subject';
import {Observer} from '../../base/Observer';

export function distinct<T>(equalityComparator: EqualityComparator<T> = StrictEqualityComparator.get()): OperatorFunction<T, T> {
    return (input: Observable<T>): Observable<T> => {
        return new Subject((observer: Observer<T>) => {
            let lastValue!: T;
            let lastValueInitialized: boolean = false;

            return input.subscribe((value: T) => {
                if (lastValueInitialized) {
                    if (!equalityComparator.equals(lastValue, value)) {
                        observer.next(value);
                    }
                } else {
                    lastValueInitialized = true;
                    observer.next(value);
                }

                lastValue = value;
            });
        });
    };
}
