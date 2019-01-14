import {Observable, OperatorFunction} from '../../base/Observable';
import {Subject} from '../../base/Subject';
import {Observer} from '../../base/Observer';
import {Subscription} from '../../base/Subscription';

export function take<T>(count: number): OperatorFunction<T, T> {
    return (input: Observable<T>): Observable<T> => {
        return new Subject((observer: Observer<T>) => {
            let counter: number = 0;

            const subscription: Subscription = input.subscribe((value: T) => {
                if (counter < count) {
                    observer.next(value);

                    counter++;
                } else {
                    observer.complete();

                    subscription.unsubscribe();
                }
            });

            return subscription;
        });
    };
}
