import {Subject} from './Subject';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface Value<T> extends Subject<T> {
    get(): T;
    set(value: T): void;
}
