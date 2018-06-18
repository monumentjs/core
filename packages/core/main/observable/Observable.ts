import {Observer} from './Observer';
import {Disposable} from '../Disposable';


export interface Observable<T> {
    subscribe(observer: Observer<T>): Disposable;
}
