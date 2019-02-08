import { Observable, OperatorFunction } from '../../base/Observable';
import { Subject } from '../../base/Subject';
import { Observer } from '../../base/Observer';
import { ProjectFunction } from '@monument/core';

export function map<I, O>(adapt: ProjectFunction<I, O>): OperatorFunction<I, O> {
    return (source: Observable<I>): Observable<O> => {
        return new Subject((observer: Observer<O>) => {
            return source.subscribe(
                (input: I) => {
                    observer.next(adapt(input));
                },
                error => {
                    observer.error(error);
                },
                () => {
                    observer.complete();
                }
            );
        });
    };
}
