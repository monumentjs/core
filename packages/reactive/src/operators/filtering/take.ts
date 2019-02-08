import { Observable, OperatorFunction } from '../../base/Observable';
import { Subject } from '../../base/Subject';
import { Observer } from '../../base/Observer';
import { Subscription } from '../../base/Subscription';

export function take<T>(count: number): OperatorFunction<T, T> {
    return (source: Observable<T>): Observable<T> => {
        return new Subject((observer: Observer<T>) => {
            let counter: number = 0;

            const subscription: Subscription = source.subscribe((input: T) => {
                if (counter < count) {
                    observer.next(input);

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
