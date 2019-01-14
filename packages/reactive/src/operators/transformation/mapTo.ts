import {Observable, OperatorFunction} from '../../base/Observable';
import {Subject} from '../../base/Subject';
import {Observer} from '../../base/Observer';

export function mapTo<I, O>(output: O): OperatorFunction<I, O> {
    return (input: Observable<I>): Observable<O> => {
        return new Subject((observer: Observer<O>) => {
            return input.subscribe(() => {
                observer.next(output);
            });
        });
    };
}
