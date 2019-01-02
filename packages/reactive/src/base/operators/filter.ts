import {Exception} from '@monument/core';
import {Observable, OperatorFunction} from '../Observable';
import {SimpleSubject} from '../SimpleSubject';

export function filter<T>(predicate: (value: T) => boolean): OperatorFunction<T, T> {
    return function filterOperator(input: Observable<T>): Observable<T> {
        const subject: SimpleSubject<T> = new SimpleSubject();

        input.subscribe({
            next(value: T): void {
                if (predicate(value)) {
                    subject.next(value);
                }
            },
            error(ex: Exception): void {
                subject.error(ex);
            },
            complete(): void {
                subject.complete();
            }
        });

        return subject;
    };
}
