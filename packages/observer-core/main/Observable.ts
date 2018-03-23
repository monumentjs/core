import {Disposable} from '@monument/core/main/Disposable';
import {Observer} from './Observer';


export interface Observable<T> {
    subscribe(observer: Observer<T>): Disposable;
}
