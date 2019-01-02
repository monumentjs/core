import {Subscribable} from './Subscribable';

export type OperatorFunction<T, R> = (input: Observable<T>) => Observable<R>;

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface Observable<T> extends Subscribable<T> {
    pipe<R>(operator: OperatorFunction<T, R>): Observable<R>;
}
