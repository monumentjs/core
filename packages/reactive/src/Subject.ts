import {Disposable} from '@monument/core';
import {Observer} from './Observer';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface Subject<T> {
    subscribe(observer: Observer<T>): Disposable;
}
