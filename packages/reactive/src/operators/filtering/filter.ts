import {ProjectFunction} from '@monument/core';
import {Subject} from '../../base/Subject';
import {Observer} from '../../base/Observer';
import {Observable, OperatorFunction} from '../../base/Observable';

export function filter<T>(predicate: ProjectFunction<T, boolean>): OperatorFunction<T, T> {
    return (source: Observable<T>): Observable<T> => {
        return new Subject((observer: Observer<T>) => {
            return source.subscribe((input: T) => {
                if (predicate(input)) {
                    observer.next(input);
                }
            }, (error) => {
                observer.error(error);
            }, () => {
                observer.complete();
            });
        });
    };
}
