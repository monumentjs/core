import {Exception} from '@monument/core';
import {Observable, OperatorFunction} from '../Observable';
import {SimpleSubject} from '../SimpleSubject';

export function map<T, R>(fn: (value: T) => R): OperatorFunction<T, R> {
    return function mapOperator(input: Observable<T>): Observable<R> {
        const subject: SimpleSubject<R> = new SimpleSubject();

        input.subscribe({
            next(value: T): void {
                subject.next(fn(value));
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
