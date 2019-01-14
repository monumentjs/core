import {Observable, OperatorFunction} from '../../base/Observable';
import {Subject} from '../../base/Subject';
import {Observer} from '../../base/Observer';
import {Subscription} from '../../base/Subscription';

export function takeWhile<T>(predicate: (value: T) => boolean): OperatorFunction<T, T> {
    return (input: Observable<T>): Observable<T> => {
        return new Subject((observer: Observer<T>) => {
            const subscription: Subscription = input.subscribe((value: T) => {
                if (predicate(value)) {
                    observer.next(value);
                } else {
                    observer.complete();

                    subscription.unsubscribe();
                }
            });

            return subscription;
        });
    };
}
