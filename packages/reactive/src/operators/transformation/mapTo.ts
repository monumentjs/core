import {SupplyFunction} from '@monument/core';
import {Subject} from '../../base/Subject';
import {Observer} from '../../base/Observer';
import {Observable, OperatorFunction} from '../../base/Observable';

export function mapTo<I, O>(supply: SupplyFunction<O>): OperatorFunction<I, O> {
    return (source: Observable<I>): Observable<O> => {
        return new Subject((observer: Observer<O>) => {
            return source.subscribe(() => {
                observer.next(supply());
            }, (error) => {
                observer.error(error);
            }, () => {
                observer.complete();
            });
        });
    };
}
