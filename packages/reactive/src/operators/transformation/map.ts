import {Observable, OperatorFunction} from '../../base/Observable';
import {Subject} from '../../base/Subject';
import {Observer} from '../../base/Observer';

export function map<I, O>(adapt: (input: I) => O): OperatorFunction<I, O> {
    return (input: Observable<I>): Observable<O> => {
        return new Subject((observer: Observer<O>) => {
            return input.subscribe((value: I) => {
                observer.next(adapt(value));
            });
        });
    };
}
