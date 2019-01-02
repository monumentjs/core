import {Exception} from '@monument/core';
import {Observable, OperatorFunction} from '../Observable';
import {SimpleSubject} from '../SimpleSubject';

export function mapAsync<T, R>(fn: (value: T) => Promise<R>): OperatorFunction<T, R> {
    return function mapAsyncOperator(input: Observable<T>): Observable<R> {
        const subject: SimpleSubject<R> = new SimpleSubject();

        input.subscribe({
            async next(value: T) {
                let newValue: R | undefined;

                try {
                    newValue = await fn(value);
                } catch (e) {
                    subject.error(e);

                    return;
                }

                subject.next(newValue);
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
