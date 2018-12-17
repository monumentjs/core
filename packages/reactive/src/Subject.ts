import {Observer} from './Observer';
import {Subscription} from './Subscription';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface Subject<T> {
    subscribe(observer: Observer<T>): Subscription<T>;
    unsubscribe(observer: Observer<T>): boolean;
}
