import {Observer} from './Observer';
import {Disposable} from '../base/Disposable';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface Subject<T> {
    subscribe(observer: Observer<T>): Disposable;
}
