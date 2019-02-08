import { Observable, OperatorFunction } from '../../base/Observable';
import { Subject } from '../../base/Subject';
import { Observer } from '../../base/Observer';
import { ProjectFunction } from '@monument/core';

export function mapAsync<I, O>(project: ProjectFunction<I, Promise<O>>): OperatorFunction<I, O> {
    return (source: Observable<I>): Observable<O> => {
        return new Subject((observer: Observer<O>) => {
            return source.subscribe(
                (input: I) => {
                    project(input).then(
                        (output: O) => {
                            observer.next(output);
                        },
                        (error: Error) => {
                            observer.error(error);
                        }
                    );
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
