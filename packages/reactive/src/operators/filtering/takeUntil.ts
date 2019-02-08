import { Observable, OperatorFunction } from '../../base/Observable';
import { Subject } from '../../base/Subject';
import { Observer } from '../../base/Observer';
import { Subscription } from '../../base/Subscription';

export function takeUntil<T>(notifier: Observable<any>): OperatorFunction<T, T> {
    return (source: Observable<T>): Observable<T> => {
        return new Subject((observer: Observer<T>) => {
            const cancel = () => {
                observer.complete();
                sourceSubscription.unsubscribe();
                notifierSubscription.unsubscribe();
            };
            const sourceSubscription: Subscription = source.subscribe(observer);
            const notifierSubscription: Subscription = notifier.subscribe(cancel);

            return cancel;
        });
    };
}
