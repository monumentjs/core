import {EqualityComparator, ReferenceEqualityComparator} from '@monument/core';
import {Observable, OperatorFunction} from '../../base/Observable';
import {Subject} from '../../base/Subject';
import {Observer} from '../../base/Observer';

export function distinct<T>(equalityComparator: EqualityComparator<T> = ReferenceEqualityComparator.get()): OperatorFunction<T, T> {
    return (source: Observable<T>): Observable<T> => {
        return new Subject((observer: Observer<T>) => {
            let lastValue!: T;
            let lastValueInitialized: boolean = false;

            return source.subscribe((input: T) => {
                if (lastValueInitialized) {
                    if (!equalityComparator.equals(lastValue, input)) {
                        observer.next(input);
                    }
                } else {
                    lastValueInitialized = true;
                    observer.next(input);
                }

                lastValue = input;
            });
        });
    };
}
