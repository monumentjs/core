import {IterableObservable} from './IterableObservable';

/**
 * @since 0.0.1
 * @author Alex Chugaev
 */
export class ValuesObservable<T> extends IterableObservable<T> {
    public constructor(...values: T[]) {
        super(values);
    }
}
