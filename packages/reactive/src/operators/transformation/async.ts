import {Observable, OperatorFunction} from '../../base/Observable';
import {Subject} from '../../base/Subject';
import {Observer} from '../../base/Observer';

export function async<T>(): OperatorFunction<Promise<T>, T> {
    return (input: Observable<Promise<T>>): Observable<T> => {
        return new Subject((observer: Observer<T>) => {
            return input.subscribe((promise: Promise<T>) => {
                promise.then((value: T) => {
                    observer.next(value);
                }, (error: Error) => {
                    observer.error(error);
                });
            });
        });
    };
}
