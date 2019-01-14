import {Observable, OperatorFunction} from '../../base/Observable';
import {Subject} from '../../base/Subject';
import {Observer} from '../../base/Observer';

export function filter<T>(predicate: (value: T) => boolean): OperatorFunction<T, T> {
    return (input: Observable<T>): Observable<T> => {
        return new Subject((observer: Observer<T>) => {
            return input.subscribe((value: T) => {
                if (predicate(value)) {
                    observer.next(value);
                }
            });
        });
    };
}
