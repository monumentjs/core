import {AbstractSubscribable} from './AbstractSubscribable';
import {Observable, OperatorFunction} from './Observable';

export abstract class AbstractObservable<T> extends AbstractSubscribable<T> implements Observable<T> {
    public pipe<O>(operator: OperatorFunction<T, O>): Observable<O> {
        return operator(this);
    }
}
